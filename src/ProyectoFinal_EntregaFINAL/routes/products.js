const express = require('express');

const { getProducts, 
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        getProductsByCategory } = require('../controllers/products');

const { isAdminUser } = require('../middlewares/auth');

const router = express.Router();
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', isAdminUser, createProduct);
router.put('/:id', isAdminUser, updateProduct);
router.delete('/:id', isAdminUser, deleteProduct);
router.get('/category/:category', getProductsByCategory);

module.exports = router;