const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const moment = require('moment-timezone');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const { contenedorProductos, contenedorMensajes } = require('./daos');
const { getRandomProducts } = require('./mocks/products');
const { normalizeMessages } = require('./normalizr');

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Vistas
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('form');
})

app.get('/productsTemplate', (req, res) => {
    res.sendFile(__dirname + '/views/table.ejs')
})

// Endpoints
app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);

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

// Lógica de sockets
io.on('connection', async (socket) => {
    
    /* Se comenta la consulta de productos persistidos para utilizar Mock en el cliente
        const products = await contenedorProductos.getAll();
        socket.emit('products', products);
    */

    const messages = await contenedorMensajes.getAll();
    const normalizedData = normalizeMessages(messages);
    socket.emit('messages', normalizedData);

    socket.on('new-product', async (data) => {
        await contenedorProductos.save(data);
        const products = await contenedorProductos.getAll();
        io.sockets.emit('products', products);
    })

    socket.on('new-message', async (message) => {
        message.date = moment().tz('America/Argentina/Buenos_Aires').format('DD/MM/YYYY HH:mm:ss');
        await contenedorMensajes.save(message);
        const messages = await contenedorMensajes.getAll();
        const normalizedData = normalizeMessages(messages);
        io.sockets.emit('messages', normalizedData);
    })
})