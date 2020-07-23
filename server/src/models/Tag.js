require('dotenv').config();
const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    usage: {
        type: Number,
        required: true,
    },
});

TagSchema.plugin(mongoose_fuzzy_searching, {
    fields: ['name'],
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
