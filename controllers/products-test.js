const { getRandomProductsService } = require('../service/products-test');

const getRandomProducts = (req, res) => {
    const randomProducts = getRandomProductsService();
    res.json(randomProducts);
}

module.exports = {
    getRandomProducts
}