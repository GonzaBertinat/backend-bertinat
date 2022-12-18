const ContenedorSQL = require('../../contenedores/ContenedorSQL');
const { sqliteOptions, productosTabla } = require('../../config');
const ProductoDTO = require('../../dto/ProductoDTO');

let instance = null;

class ProductosDaoSQLite extends ContenedorSQL {

    constructor(){
        super(sqliteOptions, productosTabla, ProductoDTO);
    }

    static getInstance(){
        if(!instance){
            instance = new ProductosDaoSQLite();
        }
        return instance;
    }
}

module.exports = ProductosDaoSQLite;