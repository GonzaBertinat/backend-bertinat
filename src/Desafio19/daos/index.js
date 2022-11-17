const config = require('../config');

const ProductoDAO = require(`../daos/productos/ProductosDao${config.metodoPersistencia.productos}`);
const CarritoDAO = require(`../daos/carritos/CarritosDao${config.metodoPersistencia.carritos}`);
const MensajesDAO = require(`../daos/mensajes/MensajesDao${config.metodoPersistencia.mensajes}`);
const UsuariosDAO = require(`../daos/usuarios/UsuariosDao${config.metodoPersistencia.usuarios}`);

module.exports = {
    contenedorProductos: new ProductoDAO(),
    contenedorCarritos: new CarritoDAO(),
    contenedorMensajes: new MensajesDAO(),
    contenedorUsuarios: new UsuariosDAO()
}