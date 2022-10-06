const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { Server: HttpServer } = require('http');
const MongoStore = require('connect-mongo');
const { mongoURL } = require('./config');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const sessionRouter = require('./routes/session');
const { getRandomProducts } = require('./mocks/products');
const initializeSocket = require('./socket');
const passport = require('passport');
const { signupStrategy, loginStrategy, serializeUser, deserializeUser } = require('./passport');

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = initializeSocket(httpServer);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIES_SECRET));

passport.use('signup', signupStrategy);
passport.use('login', loginStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    cookie: { maxAge: Number(process.env.EXPIRATION_TIME) || 60000 },
    rolling: true,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: mongoURL})
}));

app.use(passport.initialize());
app.use(passport.session());

// APIs
app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);

// Vistas
app.use('/', sessionRouter);
app.get('/productsTemplate', (req, res) => {
    res.sendFile(__dirname + '/views/table.ejs')
})

app.get('/api/productos-test', (req, res) => {
    const randomProducts = getRandomProducts();
    res.json(randomProducts);
})

app.all('*', (req, res) => {
    res.status(404).json({
        error: -2,
        descripcion: `ruta ${req.originalUrl} - método ${req.method} no implementada`,
    })
})

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));