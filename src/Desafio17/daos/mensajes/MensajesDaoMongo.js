const ContenedorMongo = require('../../contenedores/ContenedorMongo');
const { mensajesCollection } = require('../../config');
const MensajesModel = require('../../models/message.js');

class MensajesDaoMongo extends ContenedorMongo {
    
    constructor(){
        super(mensajesCollection, MensajesModel);
    }
}

module.exports = MensajesDaoMongo;