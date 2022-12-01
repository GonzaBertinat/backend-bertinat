const ContenedorMongo = require('../../contenedores/ContenedorMongo');
const { usuariosCollection } = require('../../config');
const UsuariosModel = require('../../models/user');
const UsuarioDTO = require('../../dto/UsuarioDTO');
const logger = require('../../utils/winston');

let instance = null;

class UsuariosDaoMongo extends ContenedorMongo {
    
    constructor(){
        super(usuariosCollection, UsuariosModel, UsuarioDTO);
    }
    
    static getInstance(){
        if(!instance){
            instance = new UsuariosDaoMongo();
        }
        return instance;
    }

    async getByEmail(email) {
        try {
            const data = await this.model.findOne({ email: email });
            if(data){
                return new this.dto(data);
            } else {
                return null;
            }
        } catch(error) {
            logger.error(error);
        }
    }
}

module.exports = UsuariosDaoMongo;