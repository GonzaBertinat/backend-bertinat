const mongoose = require('mongoose');
const { carritosCollection } = require('../config');
const { ProductoSchema } = require('../models/product');

const CarritoSchema = new mongoose.Schema({
    timestamp: {
        type: Number,
        required: true
    },
    products: {
        type: [ProductoSchema]
    } 
});

module.exports = mongoose.model(carritosCollection, CarritoSchema);