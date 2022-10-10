const { contenedorCarritos, contenedorProductos } = require('../daos');

const createCart = async (req, res) => {
    const newCarrito = {
        timestamp: Date.now(),
        products: []
    };
    const id = await contenedorCarritos.save(newCarrito);
    res.status(201).json({ id });
}

const deleteCart = async (req, res) => {
    const { id } = req.params;
    const cart = await contenedorCarritos.getById(id);
    if(!cart) {
        res.status(404).json({error: 'carrito no encontrado'});
    } else {
        await contenedorCarritos.deleteById(id);
        res.json({
            ok: true,
            status: 'Carrito eliminado con éxito'
        });
    }
}

const getProductsFromCart = async (req, res) => {
    const { id } = req.params;
    const cart = await contenedorCarritos.getById(id);
    if(!cart) {
        res.status(404).json({error: 'carrito no encontrado'});
    } else {
        res.status(200).json(cart.products);
    }
}

const addProductToCart = async (req, res) => {
    const { id: cartId } = req.params;
    const { id: productId } = req.body;

    // Se valida la existencia del carrito y del producto
    const cart = await contenedorCarritos.getById(cartId);
    const productToAdd = await contenedorProductos.getById(String(productId));

    if(!cart){
        res.status(404).json({error: 'carrito no encontrado'})
    }
    else if(!productToAdd){
        res.status(404).json({error: 'producto no encontrado'})
    }
    else {
        const productIndex = cart.products.findIndex(product => product.id === productToAdd.id);
        if(productIndex >= 0) {
            cart.products[productIndex].units++;
        } else {
            productToAdd.units = 1;
            cart.products = [...cart.products, productToAdd];
        }
        cart.timestamp = Date.now();
        await contenedorCarritos.update(cart);

        res.status(200).json(cart);
    }   
}

const deleteProductFromCart = async (req, res) => {
    const { id: cartId, id_prod: productId } = req.params;

    const cart = await contenedorCarritos.getById(cartId);
    
    if(!cart){
        res.status(404).json({error: 'carrito no encontrado'})
    } else {
        const productIndex = cart.products.findIndex(product => String(product.id) === productId);
        if(productIndex < 0){
            res.status(404).json({error: 'el producto no se encuentra en el carrito'});
        } else {
            cart.products = cart.products.filter(product => String(product.id) !== productId);
            cart.timestamp = Date.now();
            await contenedorCarritos.update(cart);
            res.status(200).json({
                ok: true,
                status: 'Producto eliminado con éxito del carrito'
            });
        }
    }
}

module.exports = {
    createCart,
    deleteCart,
    getProductsFromCart,
    addProductToCart,
    deleteProductFromCart
}