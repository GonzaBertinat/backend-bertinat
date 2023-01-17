const DAOFactory = require('../daos/DAOFactory');
const factory = new DAOFactory();
const logger = require('../utils/winston');
const Mensaje = require('../entities/Mensaje');
const MensajeDTO = require('../dto/MensajeDTO');

class MensajeRepository {

    constructor(){
        this.dao = factory.createDAO('messages');
    }
    
    async save(message) { 
        try {
            const dto = new MensajeDTO(message);
            return this.dao.save(dto);
        } catch(error) {
            logger.error(error);
        }
    }

    async getById(id) { 
        try {
            const dto = await this.dao.getById(id);
            if(dto){
                return new Mensaje(dto);
            } else {
                return null;
            }            
        } catch(error) {
            logger.error(error);
        }
    }

    async getAll() { 
        try {
            const dtos = await this.dao.getAll();
            return dtos.map(dto => new Mensaje(dto));
        } catch(error) {
            logger.error(error);
        }
    }

    async deleteById(id) { 
        try {
            await this.dao.deleteById(id);
        } catch(error) {
            logger.error(error);
        }
    }

    async deleteAll() { 
        try {
            await this.dao.deleteAll();
        } catch(error) {
            logger.error(error);
        }
    }

    async update(messageUpdated) { 
        try {
            const dto = new MensajeDTO(messageUpdated);
            return new Mensaje(await this.dao.update(dto));
        } catch(error) {
            logger.error(error);
        }
    }

    async getByEmail(email) {
        try {
            const dtos = await this.dao.getByEmail(email);
            return dtos.map(dto => new Mensaje(dto));
        } catch(error) {
            logger.error(error);
        }
    }
}

module.exports = MensajeRepository;