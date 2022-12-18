const { Server: IOServer } = require('socket.io');
const moment = require('moment-timezone');
const { normalizeMessages } = require('./normalizr');
const MensajeRepository = require('../repository/MensajeRepository');
const ProductoRepository = require('../repository/ProductoRepository');
const Producto = require('../entities/Producto');
const Mensaje = require('../entities/Mensaje');
const DAOFactory = require('../daos/DAOFactory');
const factory = new DAOFactory();
const contenedorUsuarios = factory.createDAO('users');
const mensajeRepo = new MensajeRepository();
const productoRepo = new ProductoRepository();

const initializeSocket = (httpServer) => {
    const io = new IOServer(httpServer);

    io.on('connection', async (socket) => {
    
        const products = await productoRepo.getAll();
        socket.emit('products', products.map(producto => {
            const { id: productId, title, description, price, thumbnail, code, stock, timestamp, units } = producto;
            return {
                id: productId, title, description, price, thumbnail, code, stock, timestamp, units
            }
        }));
    
        const messages = await mensajeRepo.getAll();
        const normalizedData = normalizeMessages(messages);
        socket.emit('messages', normalizedData);
    
        socket.on('new-product', async (data) => {
            await productoRepo.save(new Producto(data));
            const products = await productoRepo.getAll();
            io.sockets.emit('products', products.map(producto => {
                const { id: productId, title, description, price, thumbnail, code, stock, timestamp, units } = producto;
                return {
                    id: productId, title, description, price, thumbnail, code, stock, timestamp, units
                }
            }));
        })
    
        socket.on('new-message', async (message) => {
            const user = await contenedorUsuarios.getByEmail(message.author.id);
            message.author.nombre = user.name;
            message.author.apellido = ""; 
            message.author.edad = user.age;
            message.author.avatar = user.avatar;
            message.date = moment().tz('America/Argentina/Buenos_Aires').format('DD/MM/YYYY HH:mm:ss');
            
            await mensajeRepo.save(new Mensaje(message));
            const messages = await mensajeRepo.getAll();
            const normalizedData = normalizeMessages(messages);
            io.sockets.emit('messages', normalizedData);
        })
    });

    return io;
}

module.exports = initializeSocket;