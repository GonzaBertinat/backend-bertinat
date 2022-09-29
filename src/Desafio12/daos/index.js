require('dotenv').config();

const ProductoDAO = require(`../daos/productos/ProductosDao${process.env.CONTENEDOR_PRODUCTOS}`);
const CarritoDAO = require(`../daos/carritos/CarritosDao${process.env.CONTENEDOR_CARRITOS}`);
const MensajesDAO = require(`../daos/mensajes/MensajesDao${process.env.CONTENEDOR_MENSAJES}`);

module.exports = {
    contenedorProductos: new ProductoDAO(),
    contenedorCarritos: new CarritoDAO(),
    contenedorMensajes: new MensajesDAO()
}