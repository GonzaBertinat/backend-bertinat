const ContenedorArchivo = require('../../contenedores/ContenedorArchivo');
const { carritosPath } = require('../../config');
const CarritoDTO = require('../../dto/CarritoDTO');

let instance = null;

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor(){
        super(carritosPath, CarritoDTO);
    }

    static getInstance(){
        if(!instance){
            instance = new CarritosDaoArchivo();
        }
        return instance;
    }
}

module.exports = CarritosDaoArchivo;