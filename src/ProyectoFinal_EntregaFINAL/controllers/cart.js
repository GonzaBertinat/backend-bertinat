const { createCartService,
        getCartByIdService,
        deleteCartByIdService,
        addProductToCartService,
        deleteProductFromCartService } = require('../service/cart');
const { getProductByIdService } = require('../service/products');

const createCart = async (req, res) => {
    const { email, deliveryAddress } = req.body;
    const id = await createCartService(email, deliveryAddress);
    res.status(201).json({ id });
}

const deleteCart = async (req, res) => {
    const { id } = req.params;
    const cart = await getCartByIdService(id);
    if(!cart) {
        res.status(404).json({error: 'carrito no encontrado'});
    } else {
        await deleteCartByIdService(id);
        res.json({
            ok: true,
            status: 'Carrito eliminado con éxito'
        });
    }
}

const getProductsFromCart = async (req, res) => {
    const { id } = req.params;
    const cart = await getCartByIdService(id);
    if(!cart) {
        res.status(404).json({error: 'carrito no encontrado'});
    } else {
        res.status(200).json(cart.products);
    }
}

const addProductToCart = async (req, res) => {
    const { id: cartId } = req.params;
    const { id: productId, units } = req.body;

    const cart = await getCartByIdService(cartId);
    const productToAdd = await getProductByIdService(String(productId));

    if(!cart){
        res.status(404).json({error: 'carrito no encontrado'})
    }
    else if(!productToAdd){
        res.status(404).json({error: 'producto no encontrado'})
    }
    else {
        const cartUpdated = await addProductToCartService(cartId, String(productId), units);
        res.status(200).json(cartUpdated);
    }   
}

const deleteProductFromCart = async (req, res) => {
    const { id: cartId, id_prod: productId } = req.params;

    const cart = await getCartByIdService(cartId);
    
    if(!cart){
        res.status(404).json({error: 'carrito no encontrado'})
    } else {
        const productIndex = cart.products.findIndex(product => String(product.id) === productId);
        if(productIndex < 0){
            res.status(404).json({error: 'el producto no se encuentra en el carrito'});
        } else {
            await deleteProductFromCartService(cartId, productId);
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