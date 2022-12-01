const ContenedorSQL = require('../../contenedores/ContenedorSQL');
const { sqliteOptions, carritosTabla } = require('../../config');
const CarritoDTO = require('../../dto/CarritoDTO');

let instance = null;

class CarritosDaoSQLite extends ContenedorSQL {

    constructor(){
        super(sqliteOptions, carritosTabla, CarritoDTO);
    }

    static getInstance(){
        if(!instance){
            instance = new CarritosDaoSQLite();
        }
        return instance;
    }
}

module.exports = CarritosDaoSQLite;