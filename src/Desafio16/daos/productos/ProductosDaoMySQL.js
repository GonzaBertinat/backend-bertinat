const ContenedorSQL = require('../../contenedores/ContenedorSQL');
const { mysqlOptions, productosTabla } = require('../../config');

class ProductosDaoMySQL extends ContenedorSQL {

    constructor(){
        super(mysqlOptions, productosTabla);
    }
}

module.exports = ProductosDaoMySQL;