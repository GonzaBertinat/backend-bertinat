const express = require('express');
const passport = require('passport');
const { loadRoot, loadSignUp, loadLogin, postSignUp, postLogin, failSignUp, failLogin, doLogout } = require('../controllers/session');
const { checkAuthentication } = require('../middlewares/auth');

const router = express.Router();

// Home
router.get('/', checkAuthentication, loadRoot);

// Registro
router.get('/register', loadSignUp);
router.post('/register', passport.authenticate('signup', { failureRedirect: '/failregister'}), postSignUp);
router.get('/failregister', failSignUp);

// Login
router.get('/login', loadLogin);
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin'}), postLogin);
router.get('/faillogin', failLogin);

// Logout
router.post('/logout', checkAuthentication, doLogout);

module.exports = router;