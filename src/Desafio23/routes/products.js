const Router = require('koa-router');

const { getProducts, 
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct } = require('../controllers/products');

const { isAdminUser } = require('../middlewares/auth');

const router = new Router({
    prefix: '/api/productos'
});

router.get('/', getProducts); 
router.get('/:id', getProduct); 
router.post('/', isAdminUser, createProduct); 
router.put('/:id', isAdminUser, updateProduct); 
router.delete('/:id', isAdminUser, deleteProduct); 

module.exports = router;