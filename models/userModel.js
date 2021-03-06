const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
        type: String,
        deault: 'test.jpg'
    },
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        select: false,
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function(el) {
              return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    },
    passwordChangeAt: Date
})

userSchema.pre('save', async function(next){
    console.log('pre save :')
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined;
    console.log('pre save end:')

    next();
});

userSchema.methods.correctPassword = async function(userPassword, actualPassword) {
    return await bcrypt.compare(userPassword, actualPassword);
};

// userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
//     if (this.passwordChangedAt) {
//         const changedTimestamp = parseInt(
//           this.passwordChangedAt.getTime() / 1000,
//           10
//         );
    
//         return JWTTimestamp < changedTimestamp;
//       }
    
//       // False means NOT changed
//       return false;
// };

const User = mongoose.model('User', userSchema)

module.exports = User;