const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');
const { usuariosCollection } = require('../../config');

class UsuariosDaoFirebase extends ContenedorFirebase {
    
    constructor(){
        super(usuariosCollection);
    }
}

module.exports = UsuariosDaoFirebase;