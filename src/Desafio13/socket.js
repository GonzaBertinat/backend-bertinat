const { Server: IOServer } = require('socket.io');
const { contenedorProductos, contenedorMensajes } = require('./daos');
const { normalizeMessages } = require('./normalizr');
const moment = require('moment-timezone');

const initializeSocket = (httpServer) => {
    const io = new IOServer(httpServer);

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
          /*  const products = await contenedorProductos.getAll();
            io.sockets.emit('products', products);*/
        })
    
        socket.on('new-message', async (message) => {
            message.date = moment().tz('America/Argentina/Buenos_Aires').format('DD/MM/YYYY HH:mm:ss');
            await contenedorMensajes.save(message);
            const messages = await contenedorMensajes.getAll();
            const normalizedData = normalizeMessages(messages);
            io.sockets.emit('messages', normalizedData);
        })
    });

    return io;
}

module.exports = initializeSocket;