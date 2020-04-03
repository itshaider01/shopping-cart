const mongoose = require("mongoose");
const Product = require("../models/product");

exports.get_all_products = (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .exec()
    .then(doc => {
      const response = {
        count: doc.length,
        products: doc.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            id: doc._id,
            productImage: doc.productImage,
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
};

exports.create_product = (req, res) => {
  console.log(req.file);
  const { name, price, productImage } = req.body;
  const product = new Product({
    name,
    price,
    productImage: req.file.path
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
          productImage: result.productImage,
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
};

exports.update_product = (req, res) => {
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
};

exports.delete_product = (req, res) => {
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
};

exports.get_product = (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        console.log(doc);
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          status: "Product not Found!"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
