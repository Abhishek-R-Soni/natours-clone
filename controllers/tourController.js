const { json } = require("express");

exports.getTour = (req, res) => {
    res.status(200).json({
        status: "GET"
    })
};

exports.createTour = (req, res) => {
    res.status(201).json({
        status: "POST"
    })
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: "PATCH"
    })
};

exports.deleteTour = (req, res) => {
    res.status(204);
};