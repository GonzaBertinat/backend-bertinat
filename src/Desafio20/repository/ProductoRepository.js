const DAOFactory = require('../daos/DAOFactory');
const Producto = require('../entities/Producto');
const ProductoDTO = require('../dto/ProductoDTO');
const factory = new DAOFactory();
const logger = require('../utils/winston');

class ProductoRepository {

    constructor(){
        this.dao = factory.createDAO('products');
    }
    
    async save(product) { 
        try {
            const dto = new ProductoDTO(product);
            return this.dao.save(dto);
        } catch(error) {
            logger.error(error);
        }
    }

    async getById(id) { 
        try {
            const dto = await this.dao.getById(id);
            if(dto){
                return new Producto(dto);
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
            return dtos.map(dto => new Producto(dto));
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

    async update(productUpdated) { 
        try {
            const dto = new ProductoDTO(productUpdated);
            return new Producto(await this.dao.update(dto));
        } catch(error) {
            logger.error(error);
        }
    }
}

module.exports = ProductoRepository;