const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String
    },
    cuisine: {
        type: String,
        enum: ['asian', 'euro', 'northwest', 'comfort', 'other']
    },
    reviews: {
        type: Array
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
