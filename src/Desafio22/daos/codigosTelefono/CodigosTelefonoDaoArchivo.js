const ContenedorArchivo = require('../../contenedores/ContenedorArchivo');
const { codigosTelefonoPath } = require('../../config');
const CodigoTelefonoDTO = require('../../dto/CodigoTelefonoDTO');

let instance = null;

class CodigosTelefonoDaoArchivo extends ContenedorArchivo {

    constructor(){
        super(codigosTelefonoPath, CodigoTelefonoDTO);
    }

    static getInstance(){
        if(!instance){
            instance = new CodigosTelefonoDaoArchivo();
        }
        return instance;
    }
}

module.exports = CodigosTelefonoDaoArchivo;