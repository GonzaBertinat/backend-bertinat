const config = require('../config');
const ProductosDAO = require(`../daos/productos/ProductosDao${config.metodoPersistencia.productos}`);
const CarritosDAO = require(`../daos/carritos/CarritosDao${config.metodoPersistencia.carritos}`);
const MensajesDAO = require(`../daos/mensajes/MensajesDao${config.metodoPersistencia.mensajes}`);
const UsuariosDAO = require(`../daos/usuarios/UsuariosDao${config.metodoPersistencia.usuarios}`);
const CodigosTelefonoDAO = require('../daos/codigosTelefono/CodigosTelefonoDaoArchivo');
const OrdenesDAO = require(`../daos/ordenes/OrdenesDao${config.metodoPersistencia.ordenes}`);

class DAOFactory {

    createDAO(type){
        switch(type){
            case 'products': {
                return ProductosDAO.getInstance();
            }
            case 'carts': {
                return CarritosDAO.getInstance();
            }
            case 'messages': {
                return MensajesDAO.getInstance();
            }
            case 'users': {
                return UsuariosDAO.getInstance();
            }
            case 'phoneCodes': {
                return CodigosTelefonoDAO.getInstance();
            }
            case 'orders': {
                return OrdenesDAO.getInstance();
            }
            default: {
                return null;
            }
        }
    }
}

module.exports = DAOFactory;
