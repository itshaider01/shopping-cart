const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const credentials = require('./config/database');

mongoose.connect(
    `mongodb+srv://${credentials.USERNAME}:${credentials.PASSWORD}@shopping-cart-s34e9.mongodb.net/test?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const productsRoute = require('./api/routes/products');
const ordersRoute = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors());

app.use('/products',productsRoute);
app.use('/orders',ordersRoute);

app.use((req,res,next) =>{
    const error = new Error("Found an error");
    error.status = 404;
    next(error);
})

app.use((error,req,res,next) =>{
    res
    .status(error.status || 500)
    .json({
        error :{
            message: error.message
        }
    })
})

module.exports = app;