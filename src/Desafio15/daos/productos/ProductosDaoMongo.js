const ContenedorMongo = require('../../contenedores/ContenedorMongo');
const { productosCollection } = require('../../config');
const { ProductoModel } = require('../../models/product');

class ProductosDaoMongo extends ContenedorMongo {
    
    constructor(){
        super(productosCollection, ProductoModel);
    }
}

module.exports = ProductosDaoMongo;