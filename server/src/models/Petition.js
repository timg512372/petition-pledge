require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const petitionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // text: true,
    },
    description: {
        type: String,
        required: true,
        // text: true,
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
    goal: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isISO8601(value)) {
                throw new Error('Not a valid date');
            }
        },
    },
    tags: {
        type: Array,
        required: true,
    },
    picture: {
        type: String,
    },
});

petitionSchema.plugin(mongoose_fuzzy_searching, {
    fields: [
        { name: 'name', weight: 3 },
        { name: 'description', weight: 1 },
        // { name: 'tags', weight: 2 },
    ],
});

const Petition = mongoose.model('Petition', petitionSchema);

module.exports = Petition;
