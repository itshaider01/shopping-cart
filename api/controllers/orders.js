const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");

exports.get_all_orders = (req, res) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then(doc => {
      const response = {
        count: doc.length,
        order: doc.map(doc => {
          return {
            product: doc.product,
            quantity: doc.quantity,
            id: doc._id,
            request: {
              type: "GET",
              url: `http://localhost:5000/orders/${doc._id}`
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

exports.post_an_order = (req, res) => {
  const { productId, quantity } = req.body;
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          status: "Product not found!"
        });
      }
      const order = new Order({
        product: productId,
        quantity
      });
      return order.save();
    })
    .then(result => {
      res.status(201).json({
        status: "Order Created!",
        order: {
          _id: result.id,
          product: result.product,
          quantity: result.quantity
        }
      });
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        Error: err,
        status: "Order request rejected!"
      });
    });
};

exports.delete_an_order = (req, res) => {
  const id = req.params.id;
  Order.remove({ _id: id })
    .exec()
    .then(doc => {
      res.status(200).json({
        status: "Order Deleted!"
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.get_an_order = (req, res, next) => {
  const id = req.params.id;
  Order.find({ _id: id })
    .select("product quantity _id")
    .populate("product")
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        order: {
          product: result.product,
          quantity: result.quantity,
          orderId: result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
