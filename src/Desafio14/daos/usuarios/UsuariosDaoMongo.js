const ContenedorMongo = require('../../contenedores/ContenedorMongo');
const { usuariosCollection } = require('../../config');
const UsuariosModel = require('../../models/user');

class UsuariosDaoMongo extends ContenedorMongo {
    
    constructor(){
        super(usuariosCollection, UsuariosModel);
    }
}

module.exports = UsuariosDaoMongo;