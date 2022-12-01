const ProductoRepository = require('../repository/ProductoRepository');
const productoRepo = new ProductoRepository();
const Producto = require('../entities/Producto');

const getProductsService = async () => {
    const productos = await productoRepo.getAll();
    return productos.map(producto => {
        const { id: productId, title, description, price, thumbnail, code, stock, timestamp, units } = producto;
        return {
            id: productId, title, description, price, thumbnail, code, stock, timestamp, units
        }
    });
}

const getProductByIdService = async (id) => {
    const producto = await productoRepo.getById(id);
    if(producto){
        const { id: productId, title, description, price, thumbnail, code, stock, timestamp, units } = producto;
        return {
            id: productId, title, description, price, thumbnail, code, stock, timestamp, units
        }
    } else {
        return null;
    }
}

const createProductService = async (productData) => {
    const { title, description, code, price, thumbnail, stock } = productData;

    const newProduct = {
        timestamp: Date.now(),
        title,
        description,
        code,
        price: Number(price),
        thumbnail,
        stock: Number(stock)
    };

    const id = await productoRepo.save(new Producto(newProduct));
    newProduct.id = id;

    return newProduct;
}

const updateProductService = async (product, updatedData) => {
    const { title, description, code, price, thumbnail, stock } = updatedData;

    product.timestamp = Date.now();
    product.title = title;
    product.description = description,
    product.code = code,
    product.price = Number(price);
    product.thumbnail = thumbnail;
    product.stock = Number(stock);

    const productUpdated = await productoRepo.update(new Producto(product)); 
    if(productUpdated){
        const { id: _id, title: _title, description: _description, price: _price, thumbnail: _thumbnail, code: _code, stock: _stock, timestamp: _timestamp, units: _units } = productUpdated;
        return {
            id: _id, 
            title: _title, 
            description: _description, 
            price: _price, 
            thumbnail: _thumbnail, 
            code: _code, 
            stock: _stock, 
            timestamp: _timestamp, 
            units: _units
        }
    } else {
        return null;
    }
}

const deleteProductByIdService = async (id) => {
    await productoRepo.deleteById(id);
}

module.exports = {
    getProductsService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductByIdService
}
