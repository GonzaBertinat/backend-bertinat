const express = require('express');

const { getProducts, 
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        getProductsByCategory } = require('../controllers/products');

const router = express.Router();
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/category/:category', getProductsByCategory);

module.exports = router;