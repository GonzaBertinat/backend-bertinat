const mongoose = require('mongoose');
const { mensajesCollection } = require('../config');

const MensajeSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        maxLength: 50,
        trim: true
    },
    type: {
        type: String,
        required: true,
        maxLength: 10,
        trim: true
    },
    date: {
        type: String,
        required: true,
        minLength: 19,
        maxLength: 19,
        trim: true
    },
    text: {
        type: String, 
        required: true, 
        maxLength: 140, 
        trim: true
    }
});

module.exports = mongoose.model(mensajesCollection, MensajeSchema);