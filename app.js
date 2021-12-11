const mongoose = require('mongoose');
const express = require('express')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')

const tourRouter = require('./routs/tourRoutes')
const userRouter = require('./routs/userRoutes')
const reviewRouter = require('./routs/reviewRoutes');
const compression = require('compression');

const app = express()
app.enable('trust proxy')
app.use(express.json())
app.use(helmet());

const limiter = rateLimit({
    max: 100, // limit each IP to 100 requests per windowMs
    windowMs: 3 * 60 * 1000, // 15 minutes
    message: "Too many requests from this IP, please try again after an hour"
});

//  apply to all requests
// app.use(limiter);

// only apply to requests that begin with /api/
app.use("/api/", limiter);

// Data sanitization against NoSQL query injection (Ex. "email": {"$gt": ""})
app.use(mongoSanitize());

// Date sanitization against XSS (Ex. HTML + JS code in name field)
app.use(xss())

// compression
app.use(compression())

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
})
.then(() => console.log('DB connection successful!'))

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/reviews', reviewRouter)

app.all('*', (req, res, next) => {
    res.status(401).json({
        message: `Can't find ${req.originalUrl} on this server`
    })
})
module.exports = app;