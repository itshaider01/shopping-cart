const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then(doc => {
      const response = {
        count: doc.length,
        products: doc.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            id: doc._id,
            request: {
              type: "GET",
              url: `http://localhost:5000/${doc._id}`
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  const { name, price } = req.body;
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name,
    price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        status: "Product has been created",
        data: {
          _id: result._id,
          name: result.name,
          price: result.price,
          request: {
            type: "GET",
            url: `http://localhost:5000/${result._id}`
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const updateOps = {};
  for (const item of req.body) {
    updateOps[item.propName] = item.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        status: "The product has been updated",
        request: {
          type: "GET",
          url: "http://localhost:5000/products"
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({
        error: err
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Product.remove({ _id: id })
    .exec()
    .then(doc => {
      res.status(200).json({
        status: "The product has been deleted",
        request: {
          type: "GET",
          url: `http:localhost:5000/products`
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
