const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const router = express.Router()

router.post('/signup', authController.signup)

router
    .route('/login')
    .post(authController.login)
    
router
    .route('/')
    .get(authController.protect, userController.getAllUser)

router
    .route('/:userId')
    .get(authController.protect, userController.getUserById)
    
router.patch('/:userId/update-profile',authController.protect, userController.multerUpload, userController.updateProfilePhoto)
module.exports = router;