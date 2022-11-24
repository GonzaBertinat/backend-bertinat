const { faker } = require('@faker-js/faker');
const { commerce, image } = faker;
faker.locale = 'es';

const getMockRandomProducts = () => {
    let randomProducts = [];

    for(let i = 0; i < 5; i++){
        const product = {
            title: commerce.product(), // nombre
            price: commerce.price(), // precio
            thumbnail: image.image() // foto
        }
        randomProducts = [...randomProducts, product];
    }
    return randomProducts;
}

module.exports = {
    getMockRandomProducts
}