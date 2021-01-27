const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "order list",
  });
});

router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };

  res.status(200).json({
    message: "order created",
    data: order,
  });
});

router.get("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "order detail",
  });
});

router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "order deleted",
  });
});

module.exports = router;
