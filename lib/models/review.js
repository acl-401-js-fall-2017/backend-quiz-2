const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema([{
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comments: {
        type: String,
        maxlength: 250,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}]);

module.exports = mongoose.model('Review', schema);