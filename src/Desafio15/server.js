const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const os = require('os');
const MongoStore = require('connect-mongo');
const { Server: HttpServer } = require('http');

const config = require('./config');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const sessionRouter = require('./routes/session');
const randomsRouter = require('./routes/randoms');
const { getRandomProducts } = require('./mocks/products');
const initializeSocket = require('./utils/socket');
const passport = require('passport');
const { signupStrategy, loginStrategy, serializeUser, deserializeUser } = require('./utils/passport');

const yargs = require('yargs/yargs')(process.argv.slice(2));
const args = yargs.alias({p: 'port', m: 'modo'})
                  .default({port: 8080, modo: 'FORK'}).argv;
const PORT = Number(args.port);
const MODO = args.modo;

const app = express();
const httpServer = new HttpServer(app);
const io = initializeSocket(httpServer);

// app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(config.session.cookieSecret));

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

app.get('/info', (req, res) => {
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
    res.status(404).json({
        error: -2,
        descripcion: `ruta ${req.originalUrl} - método ${req.method} no implementada`,
    })
})

switch(MODO) {
    case "FORK": {
        const server = httpServer.listen(PORT, () => {
            console.log(`Proceso ${process.pid} - Servidor escuchando en el puerto ${PORT}`);
        });
        server.on('error', error => console.log(`Error en el servidor: ${error}`));
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
                console.log(`Worker ${worker.process.pid} finalizado`);
            })

            console.log(`Proceso padre ${process.pid} iniciado`);
        } else {
            const server = httpServer.listen(PORT, () => {
                console.log(`Worker ${process.pid} iniciado - Servidor escuchando en el puerto ${PORT}`);
            });
            server.on('error', error => console.log(`Error en el servidor: ${error}`));
        }
        break;
    }
    default: {
        console.log('El modo especificado no es válido');
        process.exit();
    }
}