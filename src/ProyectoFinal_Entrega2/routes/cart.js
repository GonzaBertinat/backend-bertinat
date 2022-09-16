const express = require('express');

const { createCart, 
        deleteCart,
        getProductsFromCart,
        addProductToCart,
        deleteProductFromCart } = require('../controllers/cart');

const router = express.Router();
router.post('/', createCart);
router.delete('/:id', deleteCart);
router.get('/:id/productos', getProductsFromCart);
router.post('/:id/productos', addProductToCart);
router.delete('/:id/productos/:id_prod', deleteProductFromCart);

module.exports = router;