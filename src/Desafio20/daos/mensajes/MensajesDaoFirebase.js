const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');
const { mensajesCollection } = require('../../config');
const MensajeDTO = require('../../dto/MensajeDTO');

let instance = null;

class MensajesDaoFirebase extends ContenedorFirebase {
    
    constructor(){
        super(mensajesCollection, MensajeDTO);
    }

    static getInstance(){
        if(!instance){
            instance = new MensajesDaoFirebase();
        }
        return instance;
    }
}

module.exports = MensajesDaoFirebase;