const ContenedorSQL = require('../../contenedores/ContenedorSQL');
const { sqliteOptions, productosTabla } = require('../../config');

class ProductosDaoSQLite extends ContenedorSQL {

    constructor(){
        super(sqliteOptions, productosTabla);
    }
}

module.exports = ProductosDaoSQLite;