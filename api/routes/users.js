const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  User.find({ email: email }).then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        status: "Mail exist"
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json(err);
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email,
            password: hash
          });
          user
            .save()
            .then(result => {
              res.status(200).json(result);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        }
      });
    }
  });
});

router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(401).json({
          status: "Auth Failed!"
        });
      }
      bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            status: "Auth Failed!"
          });
        }
        if (result) {
          return res.status(200).json({
            status: "Auth Succussful!"
          });
        }
        res.status(401).json({
          status: "Auth Failed!"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:userId", (req, res) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        status: "User deleted!"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
