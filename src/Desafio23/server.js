const Koa = require('koa');
const { koaBody } = require('koa-body');
const render = require('koa-ejs');
const serve = require('koa-static');
const session = require('koa-session');
const mount = require('koa-mount');
const http = require('http');
const path = require('path');
const config = require('./config');
const { passport } = require('./utils/passport');
const logger = require('./utils/winston');
const { logRequest } = require('./middlewares/winston');
const GraphQLController = require('./controllers/GraphQLController');

const MODO = config.modoEjecucion;
const PORT = config.express.port;

// Routers
const cartRouter = require('./routes/cart');
const productsTestRouter = require('./routes/products-test');
const productsRouter = require('./routes/products');
const randomsRouter = require('./routes/randoms');
const sessionRouter = require('./routes/session');
const templatesRouter = require('./routes/templates');
const serverRouter = require('./routes/server');

// App
const app = new Koa();

// Sockets
const initializeSocket = require('./utils/socket');
const httpServer = http.createServer(app.callback());
const io = initializeSocket(httpServer);
app.listen = (...args) => {
    httpServer.listen.call(httpServer, ...args);
    return httpServer;
};

// Espacio público
app.use(serve(path.join(__dirname, '/public')));

// Templates EJS
render(app, {
    root: path.join(__dirname, 'views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
})

// JSON
app.use(koaBody());

// Sesiones
app.keys = [config.session.sessionSecret];
app.use(session({
    key: config.session.sessionSecret,
    maxAge: config.session.expirationTime,
    rolling: true
}, app));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Logs
app.use(logRequest);

// GraphQL
app.use(mount('/graphql', new GraphQLController()));

// Rutas
app.use(cartRouter.routes()); 
app.use(productsRouter.routes()); 
app.use(productsTestRouter.routes()); 
app.use(randomsRouter.routes()); 
app.use(sessionRouter.routes()); 
app.use(templatesRouter.routes()); 
app.use(serverRouter.routes()); 

switch(MODO) {
    case "FORK": {
        const server = app.listen(PORT, () => {
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
            const server = app.listen(PORT, () => {
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
