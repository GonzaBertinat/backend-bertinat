const { contenedorProductos } = require('../daos');

const getProductsService = async () => {
    return await contenedorProductos.getAll();
}

const getProductByIdService = async (id) => {
    return await contenedorProductos.getById(id);
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

    const id = await contenedorProductos.save(newProduct);
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

    return await contenedorProductos.update(product);
}

const deleteProductByIdService = async (id) => {
    await contenedorProductos.deleteById(id);
}

module.exports = {
    getProductsService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductByIdService
}
