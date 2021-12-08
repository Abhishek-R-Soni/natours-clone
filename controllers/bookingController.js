const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');

exports.createBooking = async(req, res) => {
    try{
        if(!req.body.user) req.body.user = req.user._id;
        if(!req.body.tour) req.body.tour = req.params.tourId;
    
        const bookedTour = await Booking.create(req.body)

        res.status(201).json({
            message: 'success',
            data: bookedTour
        })
    }
    catch(err){
        res.status(401).json({
            message: 'faild',
            error: err
        })
    }
};

exports.getBookedTours = async (req, res) => {
    try{
        const bookings = await Booking.find({user: req.user.id})

        res.status(200).json({
            message: 'success',
            result: bookings.length,
            data: bookings
        })
    }
    catch(err){
        res.status(400).json({
            message: 'faild',
            error: err
        })
    }
};