const ContenedorSQL = require('../../contenedores/ContenedorSQL');
const { mysqlOptions, productosTabla } = require('../../config');
const ProductoDTO = require('../../dto/ProductoDTO');

let instance = null;

class ProductosDaoMySQL extends ContenedorSQL {

    constructor(){
        super(mysqlOptions, productosTabla, ProductoDTO);
    }
    
    static getInstance(){
        if(!instance){
            instance = new ProductosDaoMySQL();
        }
        return instance;
    }
}

module.exports = ProductosDaoMySQL;