const ContenedorArchivo = require('../../contenedores/ContenedorArchivo');
const { carritosPath } = require('../../config');

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor(){
        super(carritosPath);
    }
}

module.exports = CarritosDaoArchivo;