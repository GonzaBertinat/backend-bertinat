const DAOFactory = require('../daos/DAOFactory');
const factory = new DAOFactory();
const contenedorCarritos = factory.createDAO('carts');
const { getProductByIdService } = require('../service/products');

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
    return id;
}

const addProductToCartService = async (cartId, productId) => {
    const cart = await getCartByIdService(cartId);
    const productToAdd = await getProductByIdService(String(productId));

    const productIndex = cart.products.findIndex(product => product.id === productToAdd.id);
    if(productIndex >= 0) {
        cart.products[productIndex].units++;
    } else {
        productToAdd.units = 1;
        cart.products = [...cart.products, {...productToAdd}];
    }
    cart.timestamp = Date.now();
    return await contenedorCarritos.update(cart);
}

const deleteProductFromCartService = async (cartId, productId) => {
    const cart = await getCartByIdService(cartId);
    cart.products = cart.products.filter(product => String(product.id) !== productId);
    cart.timestamp = Date.now();
    return await contenedorCarritos.update(cart);
}

module.exports = {
    createCartService,
    getCartByIdService,
    deleteCartByIdService,
    addProductToCartService,
    deleteProductFromCartService
}