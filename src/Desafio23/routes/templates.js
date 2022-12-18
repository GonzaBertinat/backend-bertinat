const Router = require('koa-router');
const { getProductsTemplate } = require('../controllers/templates');

const router = new Router({
    prefix: '/'
});

router.get('productsTemplate', getProductsTemplate);

module.exports = router;
