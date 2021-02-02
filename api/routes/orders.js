const express = require("express");
const router = express.Router();

const Order = require("../models/order");
const checkAuth = require("../middleware/checkAuth");

const OrdersController = require("../controllers/orders");

router.get("/", checkAuth, OrdersController.orders_get_all);

router.post("/", checkAuth, OrdersController.orders_create);

router.get("/:orderId", checkAuth, OrdersController.orders_get_order);

router.delete("/:orderId", checkAuth, OrdersController.orders_delete_order);

module.exports = router;
