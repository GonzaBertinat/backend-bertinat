const mongoose = require('mongoose');
const { ordenesCollection } = require('../config');
const { ProductoSchema } = require('../models/product');

const OrdenSchema = new mongoose.Schema({
    items: {
        type: [ProductoSchema],
        required: true
    },
    orderNumber: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true,
        maxLength: 20, 
        trim: true
    },
    email: {
        type: String, 
        required: true, 
        maxLength: 50,
        trim: true
    }
});

module.exports = mongoose.model(ordenesCollection, OrdenSchema);