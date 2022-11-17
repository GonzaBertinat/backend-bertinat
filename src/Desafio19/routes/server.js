const express = require('express');
const compression = require('compression');
const { getServerInfo, handleResourceNotFound } = require('../controllers/server');

const router = express.Router();

router.get('/info', compression(), getServerInfo);
router.all('*', handleResourceNotFound);

module.exports = router;