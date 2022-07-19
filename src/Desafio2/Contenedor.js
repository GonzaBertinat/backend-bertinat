const fs = require('fs');

class Contenedor {
    
    constructor(rutaArchivo) {
        this.rutaArchivo = rutaArchivo;
    }

    async save(object) {
        try {
            const data = await fs.promises.readFile(this.rutaArchivo, 'utf-8');
            const productos = JSON.parse(data);
            let newData;
            if(productos.length > 0) {
                const ids = productos.map(producto => producto.id);
                const maxId = Math.max(...ids);            
                newData = [...productos, {...object, id: maxId + 1}]
            } else {
                newData = [{...object, id: 1}];
            }
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(newData, null, 2));
            console.log(`Producto guardado correctamente con el id: ${newData[newData.length - 1].id}`);
            return newData[newData.length - 1].id;
        } catch(error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const data = await fs.promises.readFile(this.rutaArchivo, 'utf-8');
            const productos = JSON.parse(data);
            const producto = productos.find(producto => producto.id === id);
            if(producto){
                console.log(`Se encontró el producto con id: ${id}`);
                return producto;
            } else {
                console.log(`No se encontró el producto con id: ${id}`);
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
            const productos = JSON.parse(data);
            const producto = productos.find(producto => producto.id === id);
            if(producto) {
                const newData = productos.filter(producto => producto.id !== id);
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(newData, null, 2));
                console.log(`Se eliminó el producto con id: ${id}`);
            } else {
                console.log(`No se encontró el producto con id: ${id}`);
            }
        } catch(error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([], null, 2));
            console.log('Productos eliminados exitosamente');
        } catch(error) {
            console.log(error);
        }
    }
}

module.exports = Contenedor;