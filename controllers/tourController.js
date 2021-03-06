const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getTopToursAlias = async (req, res, next) => {
    req.query.limit = 5
    req.query.sort = 'price'
    req.query.fields = 'name, price, description'
    next()
}

exports.getAllTour = async (req, res) => {
    try{
        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()

        const tours = await features.query;

        // to get detail information of query
        // const tours = await features.query.explain();

        res.status(200).json({
            status: "success",
            total: tours.length,
            data: tours
        })
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
};

exports.getTour = async (req, res) => {
    try{
        const tour = await Tour.findById(req.params.id).populate('reviews');
        res.status(200).json({
            status: "success",
            data: tour
        })
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
};

exports.createTour = async (req, res) => {
    try{
        const newTour = await Tour.create(req.body)

        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
};

exports.updateTour = async (req, res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.status(200).json({
            status: "success",
            data: tour
        })
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
};

exports.deleteTour = async (req, res) => {
    try{
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null
        })
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
};

exports.getTourStats = async (req, res) => {
    try{
        const stats = await Tour.aggregate([
            {
                $match: {'rattingsAverage': {$gte: 4.5}}
            },
            {
                $group: {
                    _id: '$difficulty',
                    numTours: {$sum: 1},
                    numRattings: {$sum: '$rattingsQuantity'},
                    avgRattings: {$avg: '$rattingsAverage'},
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: {avgPrice:1}
            }
        ])

        res.status(200).json({
            status: "success",
            total: stats.length,
            data: stats
        })
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
};