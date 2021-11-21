const tourRouter = require('./routs/tourRoutes')
const mongoose = require('mongoose');
const express = require('express')
const app = express()
app.use(express.json())

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
})
.then(() => console.log('DB connection successful!'))

app.use('/api/v1/tours', tourRouter)

module.exports = app;