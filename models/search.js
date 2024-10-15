const mongoose = require('mongoose');
const searchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    apply_link: {
        type: String,
        required: false,
        trim: true
    }
});

// Create a text index on the 'title' and 'description' fields
searchSchema.index({ title: 'text', description: 'text' });

const SearchModel = mongoose.model('Search', searchSchema);

module.exports = SearchModel;
