const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    review: {
        type: String,
        require: [true, 'Must require Review !']
    },
    ratting: {
        type: Number,
        default: 1,
        mix: 1,
        max: 5
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

// To populate data
// reviewSchema.pre(/^find/, function(next){
//     this.populate({
//         path: 'tour',
//         select: '-__V'
//     }).populate('user')
//     next()
// })

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review;