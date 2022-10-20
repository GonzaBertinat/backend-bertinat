const ContenedorMongo = require('../../contenedores/ContenedorMongo');
const { carritosCollection } = require('../../config');
const CarritoModel = require('../../models/cart');

class CarritosDaoMongo extends ContenedorMongo {
    
    constructor(){
        super(carritosCollection, CarritoModel);
    }
}

module.exports = CarritosDaoMongo;