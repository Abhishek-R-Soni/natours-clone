const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN_SECRET, {
        expiresIn: process.env.JWT_TOKEN_EXPIRE_IN
    })
};

exports.signup = async (req, res, next) => {
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            passwordChangeAt: req.body.passwordChangeAt
        })
        
        const token = signToken(newUser._id);

        res.status(201).json({
            status: "success",
            token: token,
            data: newUser
        })
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
};

exports.login = async (req, res, next) => {
    try{
        const {email, password} = req.body

        // 1. check if email or password exist
        if(!email || !password) return res.status(400).json({message: 'Please provide email and password!'})
        
        // 2. check if user exist && password is correct
        const user = await User.findOne({email}).select('+password')
        // const correct = await user.correctPassword(password, user.password)
        
        if(!user || !(await user.correctPassword(password, user.password))) return res.status(400).json({message: 'Incorrect email or password!'})
       
        // 3. if everything is ok. send token
        const token = signToken(user._id)

        res.status(200).json({
            status: "success",
            token,
            data: user
        })
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
};

exports.protect = async (req, res, next) => {
    // 1. getting of token and check of it's there
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return res.status(401).json({message: 'You are not logged in! Please log in to get access.'})
    }
    // 2. verification token
    let decoded;
    try{
        decoded = await promisify(jwt.verify)(token, process.env.JWT_TOKEN_SECRET);
        console.log(decoded)
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
    
    // 3. check if user still exists
    const currentUser = await User.findById(decoded.id)
    console.log('is exist :', currentUser)

    if(!currentUser){
        res.status(401).json({
            status: "The user belonging to this token does no longer exist.",
        })
    }
    // 4. check if user changed password after token was created
    if(currentUser.changedPasswordAfter(decoded.iat)){
        res.status(401).json({
            status: "User recently changed password! Please log in again.",
        })
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    
    next();
};