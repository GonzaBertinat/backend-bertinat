const express = require('express');
const { getProductsTemplate } = require('../controllers/templates');

const router = express.Router();

router.get('/productsTemplate', getProductsTemplate);

module.exports = router;
