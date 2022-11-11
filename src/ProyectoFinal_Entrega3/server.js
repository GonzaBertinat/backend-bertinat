const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const os = require('os');
const MongoStore = require('connect-mongo');
const { Server: HttpServer } = require('http');
const passport = require('passport');
const compression = require('compression');

const config = require('./config');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const sessionRouter = require('./routes/session');
const randomsRouter = require('./routes/randoms');
const { getRandomProducts } = require('./mocks/products');
const logger = require('./utils/winston');
const initializeSocket = require('./utils/socket');
const { signupStrategy, loginStrategy, serializeUser, deserializeUser } = require('./utils/passport');
const { logRequest } = require('./middlewares/winston');

const MODO = config.modoEjecucion;
const PORT = config.express.port;
const app = express();
const httpServer = new HttpServer(app);
const io = initializeSocket(httpServer);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(config.session.cookieSecret));
app.use(logRequest);

passport.use('signup', signupStrategy);
passport.use('login', loginStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use(session({
    secret: config.session.sessionSecret,
    cookie: { maxAge: config.session.expirationTime },
    rolling: true,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: config.mongoURL})
}));

app.use(passport.initialize());
app.use(passport.session());

// APIs
app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);
app.use('/api/randoms', randomsRouter);

// Vistas
app.use('/', sessionRouter);
app.get('/productsTemplate', (req, res) => {
    res.sendFile(__dirname + '/views/table.ejs')
})

app.get('/api/productos-test', (req, res) => {
    const randomProducts = getRandomProducts();
    res.json(randomProducts);
})

app.get('/info', compression(), (req, res) => {
    const datos = {
        argumentosEntrada: process.argv.slice(2),
        nombrePlataforma: process.platform,
        versionNodeJS: process.version,
        memoriaTotalReservada: process.memoryUsage().rss,
        pathEjecucion: process.execPath,
        processId: process.pid,
        carpetaProyecto: process.cwd(),
        numeroProcesadores: os.cpus().length
    }

    res.render('info', { datos });
});

app.all('*', (req, res) => {
    const mensaje = `ruta ${req.originalUrl} - método ${req.method} no implementada`
    logger.warn(mensaje);
    res.status(404).json({
        error: -2,
        descripcion: mensaje,
    })
})

switch(MODO) {
    case "FORK": {
        const server = httpServer.listen(PORT, () => {
            logger.info(`Proceso ${process.pid} - Servidor escuchando en el puerto ${PORT}`);
        });
        server.on('error', error => logger.error(`Error en el servidor: ${error}`));
        break;
    }
    case "CLUSTER": {
        const cluster = require('cluster');
        const numCPUs = require('os').cpus().length;
        if(cluster.isPrimary){
            for(let i=0; i < numCPUs; i++){
                cluster.fork();
            }
    
            cluster.on('exit', (worker, code, signal) => {
                logger.info(`Worker ${worker.process.pid} finalizado`);
            })

            logger.info(`Proceso padre ${process.pid} iniciado`);
        } else {
            const server = httpServer.listen(PORT, () => {
                logger.info(`Worker ${process.pid} iniciado - Servidor escuchando en el puerto ${PORT}`);
            });
            server.on('error', error => logger.error(`Error en el servidor: ${error}`));
        }
        break;
    }
    default: {
        logger.error('El modo especificado no es válido');
        process.exit();
    }
}