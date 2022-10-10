const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');
const { carritosCollection } = require('../../config');

class CarritosDaoFirebase extends ContenedorFirebase {
    
    constructor(){
        super(carritosCollection);
    }
}

module.exports = CarritosDaoFirebase;