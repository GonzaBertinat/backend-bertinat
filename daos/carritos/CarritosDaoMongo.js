const ContenedorMongo = require('../../contenedores/ContenedorMongo');
const { carritosCollection } = require('../../config');
const CarritoModel = require('../../models/cart');
const CarritoDTO = require('../../dto/CarritoDTO');
const logger = require('../../utils/winston');

let instance = null;

class CarritosDaoMongo extends ContenedorMongo {
    
    constructor(){
        super(carritosCollection, CarritoModel, CarritoDTO);
    }

    static getInstance(){
        if(!instance){
            instance = new CarritosDaoMongo();
        }
        return instance;
    }

    async update(cart) {
        try {
            cart.products.forEach(p => p._id = p.id);
            await CarritoModel.updateOne({_id: cart.id}, cart);
            logger.info(`Se actualizó el documento con id ${cart.id} de la colección ${carritosCollection}`);
            return this.getById(cart.id);
        } catch(error) {
            logger.error(error);
        }
    }
}

module.exports = CarritosDaoMongo;