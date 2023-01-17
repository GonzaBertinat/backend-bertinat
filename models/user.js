const mongoose = require('mongoose');
const { usuariosCollection } = require('../config');

const PhoneSchema = new mongoose.Schema({
    prefix: {
        type: String,
        required: true,
        maxLength: 10,
        trim: true
    },
    number: {
        type: Number,
        required: true,
        min: 1
    }
});

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
    },
    name: {
        type: String,
        required: true,
        maxLength: 30,
        trim: true
    },
    address: {
        type: String,
        required: true,
        maxLength: 50, 
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 110
    },
    phone: {
        type: PhoneSchema
    },
    avatar: {
        type: String,
        required: true,
        maxLength: 1000, 
        trim: true
    },
    cartId: {
        type: String, 
        required: false, 
        maxLength: 50,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model(usuariosCollection, UsuarioSchema);