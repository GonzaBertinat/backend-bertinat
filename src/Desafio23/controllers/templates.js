const path = require('path');
const sendfile = require('koa-sendfile');

const getProductsTemplate = async (ctx) => { 
    await sendfile(ctx, path.join(__dirname, '../views/table.ejs'));
}

module.exports = {
    getProductsTemplate
}