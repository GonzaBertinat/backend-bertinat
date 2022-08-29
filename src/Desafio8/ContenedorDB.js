const knex = require('knex');

class Contenedor {
    
    constructor(options, tableName) {
        this.db = knex(options);
        this.tableName = tableName;
    }

    async save(object) {
        try {
            const result = await this.db(this.tableName).insert(object);
            console.log(`Registro insertado con id = ${result[0]}`);
            return result[0];
        } catch(error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const results = await this.db.from(this.tableName)
                                        .select('*')
                                        .where('id', id);
            if(results.length > 0){
                console.log(`Se encontró el registro con id ${results[0].id} de la tabla ${this.tableName}`);
                return results[0];
            } else {
                console.log(`No se encontró el registro con id ${id} de la tabla ${this.tableName}`);
                return null;
            }
        } catch(error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            return await this.db.from(this.tableName).select('*');
        } catch(error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            await this.db.from(this.tableName)
                        .where('id', id)
                        .del();
            console.log(`Se eliminó el registro con id ${id} de la tabla ${this.tableName}`);
        } catch(error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await this.db.from(this.tableName).del();
            console.log(`Se eliminaron todos los registros de la tabla ${this.tableName}`);
        } catch(error) {
            console.log(error);
        }
    }

    async update(objectUpdated) {
        try {
            await this.db.from(this.tableName)
                        .where('id', objectUpdated.id)
                        .update(objectUpdated);
            console.log(`Se actualizó el registro con id ${objectUpdated.id} de la tabla ${this.tableName}`);
        } catch(error) {
            console.log(error);
        }
    }
}

module.exports = Contenedor;