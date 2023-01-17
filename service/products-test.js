const { getMockRandomProducts } = require('../mocks/products')

const getRandomProductsService = () => {
    return getMockRandomProducts();
}

module.exports = {
    getRandomProductsService
}