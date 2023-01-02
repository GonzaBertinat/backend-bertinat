const express = require('express');
const compression = require('compression');
const { getServerInfo, getServerConfig, handleResourceNotFound } = require('../controllers/server');

const router = express.Router();

router.get('/info', compression(), getServerInfo);
router.get('/config', getServerConfig);
router.all('*', handleResourceNotFound);

module.exports = router;