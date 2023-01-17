const ContenedorMongo = require('../../contenedores/ContenedorMongo');
const { mensajesCollection } = require('../../config');
const MensajesModel = require('../../models/message.js');
const MensajeDTO = require('../../dto/MensajeDTO');

let instance = null;

class MensajesDaoMongo extends ContenedorMongo {
    
    constructor(){
        super(mensajesCollection, MensajesModel, MensajeDTO);
    }

    static getInstance(){
        if(!instance){
            instance = new MensajesDaoMongo();
        }
        return instance;
    }

    async getByEmail(email){
        try {
            const result = await this.model.find({ email });
            return result.map(data => new this.dto(data));
        } catch(error) {
            logger.error(error);
        }
    }
}

module.exports = MensajesDaoMongo;