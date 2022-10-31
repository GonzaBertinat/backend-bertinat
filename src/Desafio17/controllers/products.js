const { contenedorProductos } = require('../daos');
const logger = require('../utils/winston');

const getProducts = async (req, res) => {
    const products = await contenedorProductos.getAll();
    res.status(200).json(products);
}

const getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await contenedorProductos.getById(id);
    if(!product) {
        const mensaje = { error: 'producto no encontrado' };
        logger.error(mensaje);
        res.status(404).json(mensaje);
    } else {
        res.json(product);
    }
}

const createProduct = async (req, res) => {
    const newProduct = {
        timestamp: Date.now(),
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: Number(req.body.price),
        thumbnail: req.body.thumbnail,
        stock: Number(req.body.stock)
    };

    const id = await contenedorProductos.save(newProduct);
    newProduct.id = id;
    
    res.status(201).json({
        ok: true,
        status: 'Producto guardado con éxito',
        product: newProduct
    });
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await contenedorProductos.getById(id);

    if(product) {
        product.timestamp = Date.now();
        product.title = req.body.title;
        product.description = req.body.description,
        product.code = req.body.code,
        product.price = Number(req.body.price);
        product.thumbnail = req.body.thumbnail;
        product.stock = Number(req.body.stock);

        const productUpdated = await contenedorProductos.update(product);

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
    const product = await contenedorProductos.getById(id);
    if(!product) {
        const mensaje = { error: 'producto no encontrado' };
        logger.error(mensaje);
        res.status(404).json(mensaje);
    } else {
        await contenedorProductos.deleteById(id);
        res.json({
            ok: true,
            status: 'Producto eliminado con éxito'
        });
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}