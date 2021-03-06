const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select("-__v")
    .populate("product", "-__v")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        orders: docs,
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.orders_create = (req, res, next) => {
  Product.findById(req.body.productId)
    .exec()
    .then(() => {
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });

      return order.save();
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.orders_get_order = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId)
      .select("-__v")
      .populate("product", "-__v");
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.orders_delete_order = (req, res, next) => {
  const id = req.params.orderId;

  Order.findByIdAndDelete(id)
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
