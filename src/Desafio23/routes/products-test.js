const Router = require('koa-router');
const { getRandomProducts } = require('../controllers/products-test');

const router = new Router({
    prefix: '/api/productos-test'
});

router.get('/', getRandomProducts);

module.exports = router;