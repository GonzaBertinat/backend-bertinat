const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');
const { productosCollection } = require('../../config');

class ProductosDaoFirebase extends ContenedorFirebase {
    
    constructor(){
        super(productosCollection);
    }
}

module.exports = ProductosDaoFirebase;