require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const petitionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    signers: {
        type: Array,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Not a valid URL');
            }
        },
    },
});

const Petition = mongoose.model('Petition', petitionSchema);

module.exports = Petition;
