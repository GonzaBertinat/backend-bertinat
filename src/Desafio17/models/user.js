const mongoose = require('mongoose');
const { usuariosCollection } = require('../config');

const UsuarioSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        maxLength: 50,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model(usuariosCollection, UsuarioSchema);