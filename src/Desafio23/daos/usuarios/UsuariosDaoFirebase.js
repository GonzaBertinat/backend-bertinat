const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');
const { usuariosCollection } = require('../../config');
const UsuarioDTO = require('../../dto/UsuarioDTO');
const logger = require('../../utils/winston');

let instance = null;

class UsuariosDaoFirebase extends ContenedorFirebase {
    
    constructor(){
        super(usuariosCollection, UsuarioDTO);
    }

    static getInstance(){
        if(!instance){
            instance = new UsuariosDaoFirebase();
        }
        return instance;
    }

    async getByEmail(email) {
        try {
            const snapshot = await this.query.where('email', '==', email).get();
            const result = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            if(result.length === 0){
                return null;
            } else {
                return new this.dto(result[0]);
            }
        } catch(error) {
            logger.error(error);
        }
    }
}

module.exports = UsuariosDaoFirebase;