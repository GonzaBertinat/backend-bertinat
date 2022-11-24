const express = require('express');
const passport = require('passport');
const { loadRoot, loadCart, loadProfile, processPurchase, loadSignUp, 
        loadLogin, postSignUp, postLogin, failSignUp, failLogin, doLogout } = require('../controllers/session');
const { checkAuthentication } = require('../middlewares/auth');
const upload = require('../utils/multer');

const router = express.Router();

// Home
router.get('/', checkAuthentication, loadRoot);

// Carrito
router.get('/cart', checkAuthentication, loadCart);

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