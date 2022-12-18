const { createCartService,
        getCartByIdService,
        deleteCartByIdService,
        addProductToCartService,
        deleteProductFromCartService } = require('../service/cart');
const { getProductByIdService } = require('../service/products');

const createCart = async (ctx) => { 
    const id = await createCartService();
    ctx.response.status = 201;
    ctx.body = {
        id
    }
}

const deleteCart = async (ctx) => { 
    const { id } = ctx.request.params;
    const cart = await getCartByIdService(id);
    if(!cart) {
        ctx.response.status = 404;
        ctx.body = { error: 'carrito no encontrado' };
    } else {
        await deleteCartByIdService(id);
        ctx.response.status = 200;
        ctx.body = {
            ok: true,
            status: 'Carrito eliminado con éxito'
        }
    }
}

const getProductsFromCart = async (ctx) => { 
    const { id } = ctx.request.params;
    const cart = await getCartByIdService(id);
    if(!cart) {
        ctx.response.status = 404;
        ctx.body = { error: 'carrito no encontrado' }
    } else {
        ctx.response.status = 200;
        ctx.body = cart.products;
    }
}

const addProductToCart = async (ctx) => { 
    const { id: cartId } = ctx.request.params;
    const { id: productId } = ctx.request.body;
    const cart = await getCartByIdService(cartId);
    const productToAdd = await getProductByIdService(String(productId));

    if(!cart){
        ctx.response.status = 404;
        ctx.body = { error: 'carrito no encontrado' }
    }
    else if(!productToAdd){
        ctx.response.status = 404;
        ctx.body = { error: 'producto no encontrado' }
    }
    else {
        const cartUpdated = await addProductToCartService(cartId, String(productId));
        ctx.response.status = 200;
        ctx.body = cartUpdated;
    }   
}

const deleteProductFromCart = async (ctx) => { 
    const { id: cartId, id_prod: productId } = ctx.request.params;
    const cart = await getCartByIdService(cartId);
    
    if(!cart){
        ctx.response.status = 404;
        ctx.body = { error: 'carrito no encontrado' };
    } else {
        const productIndex = cart.products.findIndex(product => String(product.id) === productId);
        if(productIndex < 0){
            ctx.response.status = 404;
            ctx.body = { error: 'el producto no se encuentra en el carrito' };
        } else {
            await deleteProductFromCartService(cartId, productId);
            ctx.response.status = 200;
            ctx.body = {
                ok: true,
                status: 'Producto eliminado con éxito del carrito'
            }
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