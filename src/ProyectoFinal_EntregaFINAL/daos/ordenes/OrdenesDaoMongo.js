const ContenedorMongo = require('../../contenedores/ContenedorMongo');
const { ordenesCollection } = require('../../config');
const OrdenModel = require('../../models/order');
const OrdenDTO = require('../../dto/OrdenDTO');

let instance = null;

class OrdenesDaoMongo extends ContenedorMongo {
    
    constructor(){
        super(ordenesCollection, OrdenModel, OrdenDTO);
    }

    static getInstance(){
        if(!instance){
            instance = new OrdenesDaoMongo();
        }
        return instance;
    }
}

module.exports = OrdenesDaoMongo;