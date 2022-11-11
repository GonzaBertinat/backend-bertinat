const ContenedorSQL = require('../../contenedores/ContenedorSQL');
const { mysqlOptions, carritosTabla } = require('../../config');

class CarritosDaoMySQL extends ContenedorSQL {

    constructor(){
        super(mysqlOptions, carritosTabla);
    }
}

module.exports = CarritosDaoMySQL;