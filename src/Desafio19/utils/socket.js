const { Server: IOServer } = require('socket.io');
const { contenedorProductos, contenedorMensajes, contenedorUsuarios } = require('../daos');
const { normalizeMessages } = require('./normalizr');
const moment = require('moment-timezone');

const initializeSocket = (httpServer) => {
    const io = new IOServer(httpServer);

    io.on('connection', async (socket) => {
    
        const products = await contenedorProductos.getAll();
        socket.emit('products', products);
    
        const messages = await contenedorMensajes.getAll();
        const normalizedData = normalizeMessages(messages);
        socket.emit('messages', normalizedData);
    
        socket.on('new-product', async (data) => {
            await contenedorProductos.save(data);
            const products = await contenedorProductos.getAll();
            io.sockets.emit('products', products);
        })
    
        socket.on('new-message', async (message) => {
            const user = await contenedorUsuarios.getByCustomFilter({ email: message.author.id });
            message.author.nombre = user.name;
            message.author.apellido = ""; 
            message.author.edad = user.age;
            message.author.avatar = user.avatar;
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