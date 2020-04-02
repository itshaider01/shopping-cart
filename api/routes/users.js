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
          user.save()
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

router.delete("/:userId", (req, res) => {
  User
    .remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        status: "User deleted!"
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
