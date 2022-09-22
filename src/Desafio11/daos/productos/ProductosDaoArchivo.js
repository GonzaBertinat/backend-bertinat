const ContenedorArchivo = require('../../contenedores/ContenedorArchivo');
const { productosPath } = require('../../config');

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor(){
        super(productosPath);
    }
}

module.exports = ProductosDaoArchivo;