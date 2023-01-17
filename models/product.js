const mongoose = require('mongoose');
const { productosCollection } = require('../config');

const ProductoSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        maxLength: 100, 
        trim: true
    },
    description: {
        type: String, 
        required: true, 
        maxLength: 150,
        trim: true
    },
    price: {
        type: Number, 
        required: true,
        min: 0
    },
    thumbnail: {
        type: String,
        required: true,
        maxLength: 500,
        trim: true
    },
    code: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        min: 1
    },
    timestamp: {
        type: Number,
        required: true
    },
    units: {
        type: Number,
        required: false,
        min: 1
    },
    category: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    }
});

module.exports = {
    ProductoModel: mongoose.model(productosCollection, ProductoSchema),
    ProductoSchema
}