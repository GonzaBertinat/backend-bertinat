const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');
const { productosCollection } = require('../../config');
const ProductoDTO = require('../../dto/ProductoDTO');

let instance = null;

class ProductosDaoFirebase extends ContenedorFirebase {
    
    constructor(){
        super(productosCollection, ProductoDTO);
    }

    static getInstance(){
        if(!instance){
            instance = new ProductosDaoFirebase();
        }
        return instance;
    }
}

module.exports = ProductosDaoFirebase;