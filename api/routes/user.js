const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });

      // try {
      //   const result = await user.save();
      //   res.status(200).json(result);
      // } catch (err) {
      //   res.status(500).json({ error: err });
      // }
    }
  });
});

// router.post("/signin", (req, res, next) => {});

module.exports = router;
