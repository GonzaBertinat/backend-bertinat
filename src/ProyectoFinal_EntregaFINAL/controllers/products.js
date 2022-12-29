const { getProductsService, 
        getProductByIdService,
        createProductService,
        updateProductService,
        deleteProductByIdService,
        getProductsByCategoryService } = require('../service/products');

const logger = require('../utils/winston');

const getProducts = async (req, res) => {
    const products = await getProductsService();
    res.status(200).json(products);
}

const getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    if(!product) {
        const mensaje = { error: 'producto no encontrado' };
        logger.error(mensaje);
        res.status(404).json(mensaje);
    } else {
        res.json(product);
    }
}

const createProduct = async (req, res) => {
    const newProduct = await createProductService(req.body);
    res.status(201).json({
        ok: true,
        status: 'Producto guardado con éxito',
        product: newProduct
    });
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    if(product) {
        const productUpdated = await updateProductService(id, req.body);
        res.json({
            ok: true,
            status: 'Producto actualizado con éxito',
            product: productUpdated
        })
    } else {
        const mensaje = { error: 'producto no encontrado' };
        logger.error(mensaje);
        res.status(404).json(mensaje);
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    if(!product) {
        const mensaje = { error: 'producto no encontrado' };
        logger.error(mensaje);
        res.status(404).json(mensaje);
    } else {
        await deleteProductByIdService(id);
        res.json({
            ok: true,
            status: 'Producto eliminado con éxito'
        });
    }
}

const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    const products = await getProductsByCategoryService(category);
    res.status(200).json(products);
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
}