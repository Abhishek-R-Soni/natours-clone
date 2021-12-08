const mongoose = require('mongoose');
// const User = require('../models/userModel')

const tourSchema = mongoose.Schema({
    _id: String,
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
        type: String
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour : {
        type: Boolean,
        default: false
    },
    startLocation: {
        type: {
            type: String,
            default: "Point",
            enum :["Point"]
        },
        coordinates: [Number],
        address: String,
        description: String
    },
    locations: [
        {
            type: {
                type: String,
                default: "Point",
                enum :["Point"]
            },
            coordinates: [Number],
            address: String,
            description: String,
            day: Number
        }
    ],
    guides: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
)

// To populate guides data
tourSchema.pre(/^find/, function(next){
    this.populate('guides')
    next()
})

// To get guides information
// tourSchema.pre('save', async function(next){
//     try{
//         const guidePromises = this.guides.map(async id => await User.findById(id));
//         this.guides = await Promise.all(guidePromises);
//         next();
//     }
//     catch(err){
//         res.json(err)
//     }
// });

//  Virtual populate of reviews field
tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
});

// indexing price field
tourSchema.index({price: -1}) // 1 for asc && -1 for desc

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;