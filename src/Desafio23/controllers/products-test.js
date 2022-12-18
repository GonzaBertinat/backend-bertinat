const { getRandomProductsService } = require('../service/products-test');

const getRandomProducts = async (ctx) => { 
    const randomProducts = getRandomProductsService();
    ctx.response.status = 200;
    ctx.body = randomProducts;
}

module.exports = {
    getRandomProducts
}