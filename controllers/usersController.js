const express = require("express");
const router = express.Router();
const db = require("../models");

/**
 * Root POST route to create a new user.
 */
router.post("/", (req, res) => {
  const email = req.body.email ? req.body.email.trim() : "";
  const password = req.body.password ? req.body.password.trim() : "";

  if (email && password) {
    db.User.create({ email, password })
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.json({
          success: false,
          message: "Failed to create new user.",
        });
      });
  } else {
    res.status(500).json({
      success: false,
      message: "Please enter a valid username and password.",
    });
  }
});

module.exports = router;
