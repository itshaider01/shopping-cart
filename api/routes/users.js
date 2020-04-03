const express = require("express");
const router = express.Router();
const User = require("../models/user");
const checkAuth = require("../middleware/auth");

const userController = require("../controllers/users");

router.post("/signup", userController.user_signup);

router.post("/login", userController.user_login);

router.delete("/:userId", checkAuth, userController.delete_user);

module.exports = router;
