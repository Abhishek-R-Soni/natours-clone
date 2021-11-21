const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must require name'],
        unique: true,
        trim: true
    },
    ratting: {
        type: Number,
        default: 3
    },
    price: {
        type: Number,
        required: [true, 'A tour must must need price']
    },
})

const tour = mongoose.model('Tour', tourSchema)

module.exports = tour