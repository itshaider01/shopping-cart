const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/auth");
const ordercontroller = require("../controllers/orders");

router.get("/", checkAuth, ordercontroller.get_all_orders);

router.post("/", checkAuth, ordercontroller.post_an_order);

router.get("/:id", checkAuth, ordercontroller.get_an_order);

router.delete("/:id", checkAuth, ordercontroller.delete_an_order);

module.exports = router;
