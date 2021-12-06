const express = require('express')

const reviewController = require('../controllers/reviewConroller')
const authController = require('../controllers/authController')

const router = express.Router({ mergeParams: true})

router
    .route('/')
    .get(authController.protect, reviewController.getAllReview)
    .post(authController.protect, reviewController.createReview)

module.exports = router;