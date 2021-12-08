const express = require('express')

const bookingController = require('../controllers/bookingController')
const authController = require('../controllers/authController')

const router = express.Router({ mergeParams: true})

router
    .route('/')
    .get(authController.protect, bookingController.getBookedTours)
    .post(authController.protect, bookingController.createBooking)

module.exports = router;