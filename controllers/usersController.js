const express = require("express");
const router = express.Router();
const db = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

/**
 * Root POST route to create a new user.
 */
router.post("/", (req, res) => {
  const email = req.body.email ? req.body.email.trim() : "";
  const password = req.body.password ? req.body.password.trim() : "";

  if (email && password) {
    db.User.create({ email, password })
      .then(async (newUser) => {
        const token = await jwt.sign(
          {
            email: newUser.email,
            id: newUser.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          },
          process.env.REACT_APP_SECRET_KEY
        );
        console.log(token);
        await res.json({
          success: true,
          data: token,
        });
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

router.put("/:id", (req, res) => {
  console.log(req.body);
  const { name, breed, age, location, imageURL } = req.body;
  const { id } = req.params;
  db.User.update(
    {
      name: name,
      breed: breed,
      age: age,
      location: location,
      imageURL: imageURL,
    },
    { where: { id: req.params.id } }
  )
    .then((rowsUpdated) => {
      res.json({
        success: true,
        data: rowsUpdated,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Failed to save user data.",
      });
    });
});

/**
 * /api/user/:id
 * return a resource
 */
router.get("/:id", (req, res) => {});

/**
 * /api/user/?breed=goldenRetriever&minAge=3&maxAge=10
 * return a collection
 */
router.get("/", (req, res) => {
  console.log(req.query);
  let newObjectToQuery = {};
  if (req.query.breed) {
    newObjectToQuery.breed = req.query.breed;
  }
  if (req.query.minAge && req.query.maxAge) {
    newObjectToQuery.age = {
      [Op.and]: {
        [Op.gte]: req.query.minAge,
        [Op.lte]: req.query.maxAge,
      },
    };
  } else if (req.query.minAge) {
    newObjectToQuery.age = { [Op.gte]: req.query.minAge };
  } else if (req.query.maxAge) {
    newObjectToQuery.age = { [Op.lte]: req.query.maxAge };
  }
  console.log(newObjectToQuery);
  db.User.findAll({
    where: newObjectToQuery,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
