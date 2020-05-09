const express = require("express");
const router = express.Router();
const db = require("../models");
const jwt = require("jsonwebtoken");

/**
 * Root POST route to validate user credentials.
 */
router.post("/", (req, res) => {
  db.User.findOne({
    where: { email: req.body.email },
  })
    .then(async (foundUser) => {
      console.log(foundUser);
      if (foundUser.password === req.body.password) {
        const token = await jwt.sign(
          {
            email: foundUser.email,
            id: foundUser.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          },
          process.env.REACT_APP_SECRET_KEY
        );
        console.log(token);
        await res.json({
          success: true,
          data: token,
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Invalid username or password.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to validate user.",
      });
    });
});

module.exports = router;
