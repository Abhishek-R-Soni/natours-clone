const { update } = require('../models/userModel');
const User = require('../models/userModel')
const multer = require('multer')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/users');
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1]
        cb(null, `user-${req.user.id}-${Date.now()}.${extension}`)
    }
});

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) cb(null, true)
    else cb('Some issue')
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.multerUpload = upload.single('photo')

exports.getAllUser = async (req, res) => {
    try{
        const users = await User.find();

        res.status(200).json({
            status: "success",
            total: users.length,
            data: users
        })
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
};

exports.getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.userId)

        res.status(200).json({
            status: "success",
            message: user
        })
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
};

exports.updateProfilePhoto = async (req, res) => {
    try{
        if(req.file) photo = req.file.filename

        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            photo
        })

        res.status(200).json({
            status: "success",
            message: "Profile update successfully !",
            user: updatedUser
        })
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
};