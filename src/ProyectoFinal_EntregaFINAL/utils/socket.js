const { Server: IOServer } = require('socket.io');
const moment = require('moment-timezone');
const { normalizeMessages } = require('./normalizr');
const MensajeRepository = require('../repository/MensajeRepository');
const ProductoRepository = require('../repository/ProductoRepository');
const Producto = require('../entities/Producto');
const Mensaje = require('../entities/Mensaje');
const DAOFactory = require('../daos/DAOFactory');
const factory = new DAOFactory();
const mensajeRepo = new MensajeRepository();
const productoRepo = new ProductoRepository();

const initializeSocket = (httpServer) => {
    const io = new IOServer(httpServer);

    io.on('connection', async (socket) => {
        socket.on('get-general-messages', async (data) => {
            const messages = await mensajeRepo.getAll();
            const normalizedData = normalizeMessages(messages);
            socket.emit('messages', normalizedData);
        });

        socket.on('get-user-messages', async (data) => {
            const messages = await mensajeRepo.getByEmail(data.email);
            const normalizedData = normalizeMessages(messages);
            socket.emit('messages', normalizedData);
        });

        socket.on('new-message', async (data) => {
            const { message, type } = data;
            message.date = moment().tz('America/Argentina/Buenos_Aires').format('DD/MM/YYYY HH:mm:ss');
            await mensajeRepo.save(new Mensaje(message));

            let messages;
            if(type === 'general'){
                messages = await mensajeRepo.getAll();
            } else {
                messages = await mensajeRepo.getByEmail(message.email);
            }
            
            const normalizedData = normalizeMessages(messages);
            io.sockets.emit('messages', normalizedData);
        });
    });

    return io;
}

module.exports = initializeSocket;