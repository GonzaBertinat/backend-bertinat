const express = require('express');
const { getRandomNumbers } = require('../controllers/randoms');

const router = express.Router();
router.get('/', getRandomNumbers);

module.exports = router;