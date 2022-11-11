const mongoose = require('mongoose');
const { mongoURL } = require('../config');
const logger = require('../utils/winston');

const connect = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        logger.info('Conectado a MongoDB...');
    } catch(error) {
        logger.error(error);
    }
}

connect();

class Contenedor {

    constructor(collectionName, model){
        this.collectionName = collectionName;
        this.model = model;
    }

    async save(object) {
        try {
            const objectModel = new this.model(object);
            let save = await objectModel.save();
            logger.info(`Documento guardado con id ${save._id} en la colección ${this.collectionName}`);
            return save._id;
        } catch(error) {
            logger.error(error);
        }
    }

    async getById(id) {
        try {
            // Validación de formato de id
            if(id.length !== 24){
                return null;
            }
            return await this.model.findById(id);
        } catch(error) {
            logger.error(error);
        }
    }

    async getAll() {
        try {
            return await this.model.find({});
        } catch(error) {
            logger.error(error);
        }
    }

    async deleteById(id) {
        try {
            await this.model.deleteOne({_id: id});
            logger.info(`Se eliminó el documento con id ${id} de la colección ${this.collectionName}`);
        } catch(error) {
            logger.error(error);
        }
    }

    async deleteAll() {
        try {
            await this.model.deleteMany({});
            logger.info(`Se eliminaron todos los documentos de la colección ${this.collectionName}`);
        } catch(error) {
            logger.error(error);
        }
    }

    async update(objectUpdated) {
        try {
            await this.model.updateOne({_id: objectUpdated.id}, objectUpdated);
            logger.info(`Se actualizó el documento con id ${objectUpdated.id} de la colección ${this.collectionName}`);
            return this.getById(objectUpdated.id);
        } catch(error) {
            logger.error(error);
        }
    }

    async getByCustomFilter(filter) {
        try {
            return await this.model.findOne(filter);
        } catch(error) {
            logger.error(error);
        }
    }
}

module.exports = Contenedor;