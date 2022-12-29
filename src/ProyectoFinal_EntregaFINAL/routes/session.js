const express = require('express');
const passport = require('passport');
const { loadRoot, loadProducts, loadProductsByCategory, loadProductById, loadCart, loadProfile, processPurchase, loadSignUp, 
        loadLogin, postSignUp, postLogin, failSignUp, failLogin, doLogout } = require('../controllers/session');
const { checkAuthentication } = require('../middlewares/auth');
const upload = require('../utils/multer');

const router = express.Router();

// Home
router.get('/', checkAuthentication, loadRoot);

// Productos
router.get('/productos', checkAuthentication, loadProducts);
router.get('/productos/categoria/:categoria', checkAuthentication, loadProductsByCategory);
router.get('/productos/:id', checkAuthentication, loadProductById);

// Carrito
router.get('/carrito', checkAuthentication, loadCart);

// Perfil de usuario
router.get('/profile', checkAuthentication, loadProfile);

// Orden de compra
router.post('/checkout', checkAuthentication, processPurchase);

// Registro
router.get('/register', loadSignUp);
router.post('/register', upload.single('avatar'), passport.authenticate('signup', { failureRedirect: '/failregister'}), postSignUp);
router.get('/failregister', failSignUp);

// Login
router.get('/login', loadLogin);
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin'}), postLogin);
router.get('/faillogin', failLogin);

// Logout
router.post('/logout', checkAuthentication, doLogout);

module.exports = router;