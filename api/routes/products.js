const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product')

router.get('/',(req,res,next) =>
{
    res.status(200).json({
        message: "Get request accepted!"
    })
})

router.post('/',(req,res) => {
    const {name, price} = req.body;
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name,
        price
    })
    product.save().then((result)=>console.log(result)).catch((err)=>console.log(err));
    res.status(200).json({
        message: "Post request accepted!",
        data: {
            product
        }
    });
});

router.get('/:id',(req,res) =>
{
    const id = req.params.id;
    res.status(200).json({
        message: `Get ID ${id} request accepted!`
    })
})

module.exports = router;