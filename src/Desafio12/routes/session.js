const express = require('express');
const { loadLogin, doLogin, doLogout } = require('../controllers/session');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();
router.get('/login', loadLogin);
router.post('/login', doLogin);
router.post('/logout', isAuthenticated, doLogout);

module.exports = router;