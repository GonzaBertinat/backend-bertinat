require('dotenv').config();

const ProductoDAO = require(`../daos/productos/ProductosDao${process.env.CONTENEDOR_PRODUCTOS}`);
const CarritoDAO = require(`../daos/carritos/CarritosDao${process.env.CONTENEDOR_CARRITOS}`);
const MensajesDAO = require(`../daos/mensajes/MensajesDao${process.env.CONTENEDOR_MENSAJES}`);
const UsuariosDAO = require(`../daos/usuarios/UsuariosDao${process.env.CONTENEDOR_USUARIOS}`);

module.exports = {
    contenedorProductos: new ProductoDAO(),
    contenedorCarritos: new CarritoDAO(),
    contenedorMensajes: new MensajesDAO(),
    contenedorUsuarios: new UsuariosDAO()
}