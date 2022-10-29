const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');
const { mensajesCollection } = require('../../config');

class MensajesDaoFirebase extends ContenedorFirebase {
    
    constructor(){
        super(mensajesCollection);
    }
}

module.exports = MensajesDaoFirebase;