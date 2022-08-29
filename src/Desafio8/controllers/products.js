const Contenedor = require('../ContenedorDB');
const { options: mysqlOptions } = require('../db/config/mysql');
const contenedorProductos = new Contenedor(mysqlOptions, 'products');

const getProducts = async (req, res) => {
    const products = await contenedorProductos.getAll();
    res.status(200).json(products);
}

const getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await contenedorProductos.getById(Number(id));
    if(!product) {
        res.status(404).json({error: 'producto no encontrado'});
    } else {
        res.json(product);
    }
}

const createProduct = async (req, res) => {
    const newProduct = {
        title: req.body.title,
        price: Number(req.body.price),
        thumbnail: req.body.thumbnail
        //timestamp: Date.now(),
        //description: req.body.description,
        //code: req.body.code,
        //stock: Number(req.body.stock)
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
    const product = await contenedorProductos.getById(Number(id));
    if(product) {
        product.title = req.body.title;
        product.price = Number(req.body.price);
        product.thumbnail = req.body.thumbnail;
        //product.timestamp = Date.now();
        //product.description = req.body.description,
        //product.code = req.body.code,
        //product.stock = Number(req.body.stock);

        await contenedorProductos.update(product);

        res.json({
            ok: true,
            status: 'Producto actualizado con éxito',
            product
        })
    } else {
        res.status(404).json({error: 'producto no encontrado'});
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await contenedorProductos.getById(Number(id));
    if(!product) {
        res.status(404).json({error: 'producto no encontrado'});
    } else {
        await contenedorProductos.deleteById(Number(id));
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