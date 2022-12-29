const mongoose = require('mongoose');
const { carritosCollection } = require('../config');
const { ProductoSchema } = require('../models/product');

const CarritoSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        maxLength: 50,
        trim: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    products: {
        type: [ProductoSchema]
    },
    deliveryAddress: {
        type: String,
        required: true,
        maxLength: 50, 
        trim: true
    }
});

module.exports = mongoose.model(carritosCollection, CarritoSchema);