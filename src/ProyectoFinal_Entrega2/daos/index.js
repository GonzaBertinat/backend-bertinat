require('dotenv').config();

const ProductoDAO = require(`../daos/productos/ProductosDao${process.env.CONTENEDOR_PRODUCTOS}`);
const CarritoDAO = require(`../daos/carritos/CarritosDao${process.env.CONTENEDOR_CARRITOS}`);

module.exports = {
    contenedorProductos: new ProductoDAO(),
    contenedorCarritos: new CarritoDAO()
}