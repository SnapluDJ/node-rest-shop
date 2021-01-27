const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "get request of products",
  });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  res.status(200).json({
    message: "post request of products",
    data: product,
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .exec()
    .then((log) => console.log(log))
    .catch((err) => console.log(err));
});

router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "update product",
  });
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "delete product",
  });
});

module.exports = router;
