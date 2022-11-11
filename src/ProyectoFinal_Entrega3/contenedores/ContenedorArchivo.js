const fs = require('fs');
const logger = require('../utils/winston');

class Contenedor {
    
    constructor(rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
    }

    async save(object) {
        try {
            const data = await fs.promises.readFile(this.rutaArchivo, 'utf-8');
            const objects = JSON.parse(data);
            let newData;
            if(objects.length > 0) {
                const ids = objects.map(obj => Number(obj.id));
                const maxId = Math.max(...ids);            
                newData = [...objects, {...object, id: maxId + 1}]
            } else {
                newData = [{...object, id: 1}];
            }
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(newData, null, 2));
            logger.info(`Objeto guardado correctamente con el id: ${newData[newData.length - 1].id}`);
            return newData[newData.length - 1].id;
        } catch(error) {
            logger.error(error);
        }
    }

    async getById(id) {
        try {
            const data = await fs.promises.readFile(this.rutaArchivo, 'utf-8');
            const objects = JSON.parse(data);
            const object = objects.find(obj => obj.id === Number(id));
            if(object){
                logger.info(`Se encontró el objeto con id: ${id}`);
                return object;
            } else {
                logger.warn(`No se encontró el objeto con id: ${id}`);
                return null;
            }
        } catch(error) {
            logger.error(error);
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.rutaArchivo, 'utf-8');
            return JSON.parse(data);
        } catch(error) {
            logger.error(error);
        }
    }

    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(this.rutaArchivo, 'utf-8');
            const objects = JSON.parse(data);
            const object = objects.find(obj => obj.id === Number(id));
            if(object) {
                const newData = objects.filter(obj => obj.id !== Number(id));
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(newData, null, 2));
                logger.info(`Se eliminó el objeto con id: ${id}`);
            } else {
                logger.warn(`No se encontró el objeto con id: ${id}`);
            }
        } catch(error) {
            logger.error(error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([], null, 2));
            logger.info('Objetos eliminados exitosamente');
        } catch(error) {
            logger.error(error);
        }
    }

    async update(objectUpdated) {
        try {
            const data = await fs.promises.readFile(this.rutaArchivo, 'utf-8');
            const objects = JSON.parse(data);
            const objectIndex = objects.findIndex(obj => obj.id === objectUpdated.id);
            if(objectIndex >= 0){
                objects[objectIndex] = objectUpdated;
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(objects, null, 2));
                logger.info(`Se actualizó el objeto con id: ${objectUpdated.id}`);
                return objectUpdated;
            } else {
                logger.warn(`No se encontró el objeto con id: ${objectUpdated.id}`);
            }
        } catch(error) {
            logger.error(error);
        }
    }
}

module.exports = Contenedor;