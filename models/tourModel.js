const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must require name'],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'A tour must require duration']
    },
    maxGroupSize: { 
        type: Number,
        required: [true, 'A tour must require group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must require difficulty']
    },
    rattingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    rattingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must must need price']
    },
    priceDiscount: Number,
    summary: {
            type: String,
            trim: true,
            required: [true, 'A tour must must need summary']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'A tour must must need description']
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must must need cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date]
})

const tour = mongoose.model('Tour', tourSchema)

module.exports = tour