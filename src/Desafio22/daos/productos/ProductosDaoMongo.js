const ContenedorMongo = require('../../contenedores/ContenedorMongo');
const { productosCollection } = require('../../config');
const { ProductoModel } = require('../../models/product');
const ProductoDTO = require('../../dto/ProductoDTO');

let instance = null;

class ProductosDaoMongo extends ContenedorMongo {
    
    constructor(){
        super(productosCollection, ProductoModel, ProductoDTO);
    }

    static getInstance(){
        if(!instance){
            instance = new ProductosDaoMongo();
        }
        return instance;
    }
}

module.exports = ProductosDaoMongo;