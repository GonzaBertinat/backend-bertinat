const mongoose = require('mongoose');
const { mensajesCollection } = require('../config');

const AutorSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        maxLength: 25,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        maxLength: 25,
        trim: true
    },
    edad: {
        type: Number,
        required: true,
        min: 0
    },
    alias: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
    avatar: {
        type: String,
        required: true,
        maxLength: 500,
        trim: true
    }
});

const MensajeSchema = new mongoose.Schema({
    author: {
        type: AutorSchema,
        required: true
    },
    text: {
        type: String, 
        required: true, 
        maxLength: 140, 
        trim: true
    },
    date: {
        type: String,
        required: true,
        minLength: 19,
        maxLength: 19,
        trim: true
    }
});

module.exports = mongoose.model(mensajesCollection, MensajeSchema);