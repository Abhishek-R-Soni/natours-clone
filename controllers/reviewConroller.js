const Review = require('../models/reviewModel');

exports.getAllReview = async (req, res) => {
    try{
        filter = req.params.tourId ? {tour: req.params.tourId} : {}
        console.log('filter :', filter)
        const reviews = await Review.find(filter);
    
        res.status(200).json({
            status: "success",
            total: reviews.length,
            data: reviews
        })
    }
    catch(err){
        res.status(401).json({
            status: "failed",
            message: "err"
        })
    }
};

exports.createReview = async (req, res) => {
    try{
        if(!req.body.tour) req.body.tour = req.params.tourId;
        if(!req.body.user) req.body.user = req.user._id;

        const newReview = await Review.create(req.body)

        res.status(200).json({
            status: "success",
            data: newReview
        })
    }
    catch(err){
        res.status(401).json({
            status: "failed",
            message: "err"
        })
    }
};