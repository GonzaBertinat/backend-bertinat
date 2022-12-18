const Router = require('koa-router');

const { createCart, 
        deleteCart,
        getProductsFromCart,
        addProductToCart,
        deleteProductFromCart } = require('../controllers/cart');

const router = new Router({
     prefix: '/api/carrito'
});

router.post('/', createCart); 
router.delete('/:id', deleteCart); 
router.get('/:id/productos', getProductsFromCart); 
router.post('/:id/productos', addProductToCart); 
router.delete('/:id/productos/:id_prod', deleteProductFromCart); 

module.exports = router;