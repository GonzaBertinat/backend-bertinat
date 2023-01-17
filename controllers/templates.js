const path = require('path');

const getProductsTemplate = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/table.ejs'));
}

module.exports = {
    getProductsTemplate
}