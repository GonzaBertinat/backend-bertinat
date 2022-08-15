let products = [];
let id = 1;

const getProducts = (req, res) => {
    res.render('productos', { products });
}

const getProduct = (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === Number(id));
    if(!product) {
        res.status(404).json({error: 'producto no encontrado'});
    } else {
        res.json(product);
    }
}

const createProduct = (req, res) => {
    const newProduct = {
        id: id++, 
        title: req.body.title,
        price: Number(req.body.price),
        thumbnail: req.body.thumbnail
    };
    products = [...products, newProduct];
    
    res.redirect('/');
}

const updateProduct = (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === Number(id));
    
    if(productIndex < 0) {
        res.status(404).json({error: 'producto no encontrado'});
    } else {
        const updatedProduct = {
            id: products[productIndex].id,
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        }
        products[productIndex] = updatedProduct;

        res.json({
            ok: true,
            status: 'Producto actualizado con éxito',
            product: updatedProduct
        }) 
    }
}

const deleteProduct = (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === Number(id));
    if(!product) {
        res.status(404).json({error: 'producto no encontrado'});
    } else {
        products = products.filter(product => product.id !== Number(id));
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