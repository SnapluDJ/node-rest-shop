const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.user_signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash,
      });

      try {
        const result = await user.save();
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  });
};

exports.user_login = async (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "user not exist",
        });
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "auth fail",
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "3h",
            }
          );
          return res.status(200).json({
            message: "auth success",
            token,
          });
        }

        res.status(401).json({
          message: "auth fail",
        });
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
