const { contenedorCarritos } = require('../daos');

const createCartService = async () => {
    const newCarrito = {
        timestamp: Date.now(),
        products: []
    };
    const id = await contenedorCarritos.save(newCarrito);
    return id;
}

const getCartByIdService = async (id) => {
    return await contenedorCarritos.getById(id);
}

const deleteCartByIdService = async (id) => {
    await contenedorCarritos.deleteById(id);
}

const addProductToCartService = async (productToAdd, cart) => {
    const productIndex = cart.products.findIndex(product => product.id === productToAdd.id);
    if(productIndex >= 0) {
        cart.products[productIndex].units++;
    } else {
        productToAdd.units = 1;
        cart.products = [...cart.products, productToAdd];
    }
    cart.timestamp = Date.now();
    return await contenedorCarritos.update(cart);
}

const deleteProductFromCartService = async (productId, cart) => {
    cart.products = cart.products.filter(product => String(product.id) !== productId);
    cart.timestamp = Date.now();
    await contenedorCarritos.update(cart);
}

module.exports = {
    createCartService,
    getCartByIdService,
    deleteCartByIdService,
    addProductToCartService,
    deleteProductFromCartService
}