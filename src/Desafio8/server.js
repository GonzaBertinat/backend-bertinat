const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const moment = require('moment-timezone');
const productsRouter = require('./routes/products');
const Contenedor = require('./ContenedorDB');
const { options: mysqlOptions } = require('./db/config/mysql');
const { options: sqliteOptions } = require('./db/config/sqlite3');

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const contenedorProductos = new Contenedor(mysqlOptions, 'products');
const contenedorMensajes = new Contenedor(sqliteOptions, 'messages');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('form');
})

app.get('/productsTemplate', (req, res) => {
    res.sendFile(__dirname + '/views/table.ejs')
})

app.use('/api/productos', productsRouter);

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));

// Lógica de sockets
io.on('connection', async (socket) => {
    const products = await contenedorProductos.getAll();
    socket.emit('products', products);

    const messages = await contenedorMensajes.getAll();
    socket.emit('messages', messages);

    socket.on('new-product', async (data) => {
        await contenedorProductos.save(data);
        const products = await contenedorProductos.getAll();
        io.sockets.emit('products', products);
    })

    socket.on('new-message', async (message) => {
        message.date = moment().tz('America/Argentina/Buenos_Aires').format('DD/MM/YYYY HH:mm:ss');
        await contenedorMensajes.save(message);
        const messages = await contenedorMensajes.getAll();
        io.sockets.emit('messages', messages);
    })
})