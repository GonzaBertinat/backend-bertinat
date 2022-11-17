const { createCartService, 
        getUserWithCartService, 
        getProductsFromCartService, 
        processPurchaseService,
        getInternationalPhoneCodesService } = require('../service/session');

const loadRoot = async (req, res) => {
    const user = await getUserWithCartService(req);
    res.render('home', { user });
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
    await processPurchaseService(products, { cartId, name, email, phone });
    // 2. Se asigna un nuevo carrito vacío al usuario
    await createCartService(req);
    // 3. Se muestra vista de éxito en la compra al cliente
    res.render('successPurchase', { cartId });
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

module.exports = {
    loadRoot,
    loadCart,
    loadProfile,
    processPurchase,
    loadSignUp,
    loadLogin,
    postSignUp,
    postLogin,
    failSignUp,
    failLogin,
    doLogout
}