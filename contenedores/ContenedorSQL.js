const knex = require('knex');
const logger = require('../utils/winston');

class Contenedor {
    
    constructor(options, tableName, dto) {
        this.db = knex(options);
        this.tableName = tableName;
        this.dto = dto;
    }
    
    
    async save(object) {
        try {
            const result = await this.db(this.tableName).insert(object);
            logger.info(`Registro insertado con id = ${result[0]}`);
            return result[0];
        } catch(error) {
            logger.error(error);
        }
    }
    
    async getById(id) {
        try {
            const results = await this.db.from(this.tableName)
                                        .select('*')
                                        .where('id', Number(id));
            if(results.length > 0){
                logger.info(`Se encontró el registro con id ${results[0].id} de la tabla ${this.tableName}`);
                const data = results[0];
                return new this.dto(data);
            } else {
                logger.warn(`No se encontró el registro con id ${id} de la tabla ${this.tableName}`);
                return null;
            }
        } catch(error) {
            logger.error(error);
        }
    }
    
    async getAll() {
        try {
            const result = await this.db.from(this.tableName).select('*');
            return result.map(data => new this.dto(data));
        } catch(error) {
            logger.error(error);
        }
    }

    async deleteById(id) {
        try {
            await this.db.from(this.tableName)
                        .where('id', Number(id))
                        .del();
            logger.info(`Se eliminó el registro con id ${id} de la tabla ${this.tableName}`);
        } catch(error) {
            logger.error(error);
        }
    }

    async deleteAll() {
        try {
            await this.db.from(this.tableName).del();
            logger.info(`Se eliminaron todos los registros de la tabla ${this.tableName}`);
        } catch(error) {
            logger.error(error);
        }
    }

    async update(objectUpdated) {
        try {
            await this.db.from(this.tableName)
                        .where('id', objectUpdated.id)
                        .update(objectUpdated);
            logger.info(`Se actualizó el registro con id ${objectUpdated.id} de la tabla ${this.tableName}`);
            return new this.dto(objectUpdated);
        } catch(error) {
            logger.error(error);
        }
    }
}

module.exports = Contenedor;