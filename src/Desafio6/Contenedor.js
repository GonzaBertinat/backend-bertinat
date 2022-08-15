const fs = require('fs');

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
                const ids = objects.map(obj => obj.id);
                const maxId = Math.max(...ids);            
                newData = [...objects, {...object, id: maxId + 1}]
            } else {
                newData = [{...object, id: 1}];
            }
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(newData, null, 2));
            console.log(`Objeto guardado correctamente con el id: ${newData[newData.length - 1].id}`);
            return newData[newData.length - 1].id;
        } catch(error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const data = await fs.promises.readFile(this.rutaArchivo, 'utf-8');
            const objects = JSON.parse(data);
            const object = objects.find(obj => obj.id === id);
            if(object){
                console.log(`Se encontró el objeto con id: ${id}`);
                return object;
            } else {
                console.log(`No se encontró el objeto con id: ${id}`);
                return null;
            }
        } catch(error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.rutaArchivo, 'utf-8');
            return JSON.parse(data);
        } catch(error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(this.rutaArchivo, 'utf-8');
            const objects = JSON.parse(data);
            const object = objects.find(obj => obj.id === id);
            if(object) {
                const newData = objects.filter(obj => obj.id !== id);
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(newData, null, 2));
                console.log(`Se eliminó el objeto con id: ${id}`);
            } else {
                console.log(`No se encontró el objeto con id: ${id}`);
            }
        } catch(error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([], null, 2));
            console.log('Objetos eliminados exitosamente');
        } catch(error) {
            console.log(error);
        }
    }
}

module.exports = Contenedor;