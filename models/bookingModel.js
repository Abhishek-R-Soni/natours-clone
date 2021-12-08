const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        require: [true, 'tour must require']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: [true, 'user must require']
    },
    price: {
        type: Number
    },
    created_at: {
        type: Date,
        default : Date.now()
    },
    paid: {
        type: Boolean,
        default: true
    }
});

bookingSchema.pre(/^find/, function(next){
    this.populate('user')
        .populate({
            path: 'tour',
            select: 'name'
        })
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;