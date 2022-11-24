const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const { Server: HttpServer } = require('http');
const config = require('./config');
const logger = require('./utils/winston');
const initializeSocket = require('./utils/socket');
const { passport } = require('./utils/passport');
const { logRequest } = require('./middlewares/winston');

// Routers
const cartRouter = require('./routes/cart');
const productsTestRouter = require('./routes/products-test');
const productsRouter = require('./routes/products');
const randomsRouter = require('./routes/randoms');
const sessionRouter = require('./routes/session');
const templatesRouter = require('./routes/templates');
const serverRouter = require('./routes/server');

const MODO = config.modoEjecucion;
const PORT = config.express.port;
const app = express();
const httpServer = new HttpServer(app);
const io = initializeSocket(httpServer);

// Espacio público
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Sesiones
app.use(cookieParser(config.session.cookieSecret));
app.use(session({
    secret: config.session.sessionSecret,
    cookie: { maxAge: config.session.expirationTime },
    rolling: true,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: config.mongoURL})
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Logs
app.use(logRequest);

// Rutas
app.use('/api/carrito', cartRouter);
app.use('/api/productos', productsRouter);
app.use('/api/productos-test', productsTestRouter);
app.use('/api/randoms', randomsRouter);
app.use('/', sessionRouter);
app.use('/', templatesRouter);
app.use('/', serverRouter);

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