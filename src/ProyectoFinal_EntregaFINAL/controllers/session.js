const { createCartService, 
        getUserWithCartService, 
        getProductsFromCartService, 
        processPurchaseService,
        getInternationalPhoneCodesService } = require('../service/session');
const { getProductsService, 
        getProductByIdService, 
        getProductsByCategoryService } = require('../service/products');

const loadRoot = async (req, res) => {
    res.redirect('/productos');
}

const loadProducts = async (req, res) => {
    const user = await getUserWithCartService(req);
    const products = await getProductsService();
    res.render('products', { user, products, category: 'TODAS' })
}

const loadProductsByCategory = async (req, res) => {
    const { categoria } = req.params;
    const user = await getUserWithCartService(req);
    const products = await getProductsByCategoryService(categoria);
    res.render('products', { user, products, category: categoria.toUpperCase().replaceAll('-',' ') })
}

const loadProductById = async (req, res) => {
    const { id } = req.params;
    const user = await getUserWithCartService(req);
    const product = await getProductByIdService(id);
    res.render('product', { user, product })
}

const loadCart = async (req, res) => {
    const user = await getUserWithCartService(req);
    const { cartId, products } = await getProductsFromCartService(user.cartId, req);
    res.render('cart', { cartId, products, user });
}

const loadProfile = async (req, res) => {
    res.render('profile', { user: req.user });
}

const processPurchase = async (req, res) => {
    const { cartId, name, email, phone } = req.user;
    const { products } = await getProductsFromCartService(cartId, req);
    // 1. Se procesa la compra 
    const orderId = await processPurchaseService(products, { name, email, phone });
    // 2. Se asigna un nuevo carrito vacío al usuario
    await createCartService(req);
    // 3. Se muestra vista de éxito en la compra al cliente
    res.render('successPurchase', { orderId });
}

const loadSignUp = async (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/');
    } else {
        const data = await getInternationalPhoneCodesService();
        res.render('signup', { countries: data });
    }
}

const postSignUp = async (req, res) => {
    res.redirect('/');
}

const failSignUp = async (req, res) => {
    res.render('signuperror');
}

const loadLogin = async (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/');
    } else {
        res.render('login');
    }
}

const postLogin = async (req, res) => {
    res.redirect('/');
}

const failLogin = async (req, res) => {
    res.render('loginerror');
}

const doLogout = async (req, res) => {
    const { email } = req.user;
    req.logout( err => {
        if(err) {
            return res.status(500).json({
                status: 'Logout ERROR',
                body: err
            })
        }
    });
    res.render('logout', { username: email });
}

const loadChat = async (req, res) => {
    res.render('chat', { user: req.user, chatMode: 'general', email: '' });
}

const loadUserChat = async (req, res) => {
    const { email } = req.params;
    if(email === req.user.email){
        res.render('chat', { user: req.user, chatMode: 'user', email });
    } else {
        res.render('forbidden', { user: req.user });
    }
}

module.exports = {
    loadRoot,
    loadProducts,
    loadProductsByCategory,
    loadProductById,
    loadCart,
    loadProfile,
    processPurchase,
    loadSignUp,
    loadLogin,
    postSignUp,
    postLogin,
    failSignUp,
    failLogin,
    doLogout,
    loadChat,
    loadUserChat
}