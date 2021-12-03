const User = require('../models/userModel')

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