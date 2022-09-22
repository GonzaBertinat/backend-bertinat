const mongoose = require('mongoose');
const { mongoURL } = require('../config');

const connect = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Conectado a MongoDB...');
    } catch(error) {
        console.log(error);
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
            console.log(`Documento guardado con id ${save._id} en la colección ${this.collectionName}`);
            return save._id;
        } catch(error) {
            console.log(error);
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
            console.log(error);
        }
    }

    async getAll() {
        try {
            return await this.model.find({});
        } catch(error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            await this.model.deleteOne({_id: id});
            console.log(`Se eliminó el documento con id ${id} de la colección ${this.collectionName}`);
        } catch(error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await this.model.deleteMany({});
            console.log(`Se eliminaron todos los documentos de la colección ${this.collectionName}`);
        } catch(error) {
            console.log(error);
        }
    }

    async update(objectUpdated) {
        try {
            await this.model.updateOne({_id: objectUpdated.id}, objectUpdated);
            console.log(`Se actualizó el documento con id ${objectUpdated.id} de la colección ${this.collectionName}`);
            return this.getById(objectUpdated.id);
        } catch(error) {
            console.log(error);
        }
    }
}

module.exports = Contenedor;