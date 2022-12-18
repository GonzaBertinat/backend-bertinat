const Router = require('koa-router');
const { getServerInfo, handleResourceNotFound } = require('../controllers/server');

const router = new Router({
    prefix: '/'
});

router.get('info', getServerInfo); 
router.all('(.*)', handleResourceNotFound); 

module.exports = router;