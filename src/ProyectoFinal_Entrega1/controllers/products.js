const Contenedor = require('../Contenedor');
const contenedorProductos = new Contenedor('./productos.txt');

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
    const product = await contenedorProductos.getById(Number(id));

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