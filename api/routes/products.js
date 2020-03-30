const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product')

router.get('/',(req,res,next) =>
{
    Product.find()
    .exec()
    .then(doc =>{
        res.status(200)
        .json(doc)
        })
    .catch(err =>{
        console.log(err)
        res.status(500)
        .json(err)
    })
})

router.post('/',(req,res) => {
    const {name, price} = req.body;
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name,
        price
    })
    product.save()
    .then((result)=>console.log(result))
    .catch((err)=>console.log(err));
    res.status(200)
    .json({
        status: "Post request accepted!",
        data: {
            product
        }
    });
});

router.patch('/:id', (req,res) =>{
    const id = req.params.id;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id:id}, {$set : updateOps})
    .exec()
    .then(result =>{
        res.status(200)
        .json(result);
    })
    .catch(err =>{
        console.log(err)
        res.status(200)
        .json({
            error: err
        })
    });
});

router.delete('/:id', (req,res) =>{
    const id = req.params.id;
    Product.remove({_id:id})
    .exec()
    .then(doc =>{
        res.status(200)
        .json(doc)
    })
    .catch(err =>{
        res.status(500)
        .json({
            error:err
        })
    })
});

router.get('/:id',(req,res) =>
{
    const id = req.params.id;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200)
        .json(doc)
    })
    .catch(err =>{
        console.log(err);
        res.status(500)
        .json({error:err})
    });
})


module.exports = router;