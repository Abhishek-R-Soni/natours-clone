const express = require('express')
const tourController = require('../controllers/tourController')
const authController = require('../controllers/authController')
const reviewRouter = require('../routs/reviewRoutes')
const router = express.Router()

router.use('/:tourId/reviews', reviewRouter)

router
    .route('/')
    .get(authController.protect, tourController.getAllTour)
    .post(tourController.createTour)

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)

router
    .route('/top-5-cheap')
    .get(tourController.getTopToursAlias, tourController.getAllTour)

router
    .route('/tour-stats')
    .get(tourController.getTourStats)

module.exports = router;