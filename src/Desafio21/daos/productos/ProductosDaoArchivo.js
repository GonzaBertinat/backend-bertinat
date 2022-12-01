const ContenedorArchivo = require('../../contenedores/ContenedorArchivo');
const { productosPath } = require('../../config');
const ProductoDTO = require('../../dto/ProductoDTO');

let instance = null;

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor(){
        super(productosPath, ProductoDTO);
    }

    static getInstance(){
        if(!instance){
            instance = new ProductosDaoArchivo();
        }
        return instance;
    }

}

module.exports = ProductosDaoArchivo;