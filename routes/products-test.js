const express = require('express');
const { getRandomProducts } = require('../controllers/products-test');

const router = express.Router();

router.get('/', getRandomProducts);

module.exports = router;