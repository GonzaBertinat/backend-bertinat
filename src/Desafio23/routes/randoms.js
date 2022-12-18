const Router = require('koa-router');
const { getRandomNumbers } = require('../controllers/randoms');

const router = new Router({
    prefix: '/api/randoms'
});

router.get('/', getRandomNumbers);

module.exports = router;