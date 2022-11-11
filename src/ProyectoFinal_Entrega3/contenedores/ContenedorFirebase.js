const admin = require("firebase-admin");
const { firebaseConfig } = require('../config');
const logger = require('../utils/winston');

const connect = async () => {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(firebaseConfig)
        });    
        logger.info('Conectado a Firebase...');
    } catch(error) {
        logger.error(error);
    }
}

connect();

class Contenedor {

    constructor(collectionName){
        this.collectionName = collectionName;
        this.query = admin.firestore().collection(collectionName);
    }

    async save(object) {
        try {            
            const doc = this.query.doc();
            await doc.create(object);
            logger.info(`Documento guardado con id ${doc.id} en la colección ${this.collectionName}`);
            return doc.id;
        } catch(error) {
            logger.error(error);
        }
    }

    async getById(id) {
        try {
            const docRef = this.query.doc(id);
            const doc = await docRef.get();
            if(doc.exists){
                logger.info(`Se encontró el documento con id ${id} en la colección ${this.collectionName}`);
                return {
                    id,
                    ...doc.data()
                }
            } else {
                logger.warn(`No se encontró el documento con id ${id} en la colección ${this.collectionName}`);
                return null;
            }
        } catch(error) {
            logger.error(error);
        }
    }

    async getAll() {
        try {
            const snapshot = await this.query.get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        } catch(error) {
            logger.error(error);
        }
    }

    async deleteById(id) {
        try {
            const doc = this.query.doc(id);
            await doc.delete();
            logger.info(`Se eliminó el documento con id ${id} de la colección ${this.collectionName}`);
        } catch(error) {
            logger.error(error);
        }
    }

    async deleteAll() {
        try {
            const snapshot = await this.query.get();
            for (const doc of snapshot.docs) {
                await doc.ref.delete();
            }
            logger.info(`Se eliminaron todos los documentos de la colección ${this.collectionName}`);
        } catch(error) {
            logger.error(error);
        }
    }

    async update(objectUpdated) {
        try {
            const doc = this.query.doc(objectUpdated.id);
            await doc.update(objectUpdated);
            logger.info(`Se actualizó el documento con id ${objectUpdated.id} de la colección ${this.collectionName}`);
            return this.getById(objectUpdated.id);
        } catch(error) {
            logger.error(error);
        }
    }
}

module.exports = Contenedor;