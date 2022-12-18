const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');
const { carritosCollection } = require('../../config');
const CarritoDTO = require('../../dto/CarritoDTO');

let instance = null;

class CarritosDaoFirebase extends ContenedorFirebase {
    
    constructor(){
        super(carritosCollection, CarritoDTO);
    }

    static getInstance(){
        if(!instance){
            instance = new CarritosDaoFirebase();
        }
        return instance;
    }
}

module.exports = CarritosDaoFirebase;