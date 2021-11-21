const express = require('express')
const tourController = require('../controllers/tourController')
const router = express.Router()

router
    .route('/')
    .get(tourController.getTour)
    .post(tourController.createTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)

module.exports = router;