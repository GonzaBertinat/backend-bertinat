const ContenedorSQL = require('../../contenedores/ContenedorSQL');
const { mysqlOptions, carritosTabla } = require('../../config');
const CarritoDTO = require('../../dto/CarritoDTO');

let instance = null;

class CarritosDaoMySQL extends ContenedorSQL {

    constructor(){
        super(mysqlOptions, carritosTabla, CarritoDTO);
    }

    static getInstance(){
        if(!instance){
            instance = new CarritosDaoMySQL();
        }
        return instance;
    }
}

module.exports = CarritosDaoMySQL;