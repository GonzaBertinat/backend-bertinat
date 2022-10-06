const ContenedorSQL = require('../../contenedores/ContenedorSQL');
const { sqliteOptions, carritosTabla } = require('../../config');

class CarritosDaoSQLite extends ContenedorSQL {

    constructor(){
        super(sqliteOptions, carritosTabla);
    }
}

module.exports = CarritosDaoSQLite;