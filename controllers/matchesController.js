const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const db = require("../models");

router.post("/", (req, res) => {
  const { UserOneId, UserTwoId, userOneStatus } = req.body;
  //TODO: Add a check to see if the match already exists in the database. 
  // if not, create it. 
  db.UserMatch.create({
    UserOneId: UserOneId,
    UserTwoId: UserTwoId,
    userOneStatus: userOneStatus,
    userTwoStatus: "pending",
  })
    .then((result) => {
      console.log(result);
      res.json({
        success: true,
        data: result,
        message: "Successfully matched with user!",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        data: null,
        message: "Unable to create new match.",
      });
    });
});

router.get("/:id/current", (req, res) => {
  console.log(req.params.id);
  db.UserMatch.findAll({
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            { UserOneId: req.params.id },
            {
              userOneStatus: {
                [Op.not]: "matched",
              },
            },
          ],
        },
        {
          [Op.and]: [
            { UserTwoId: req.params.id },
            {
              userTwoStatus: {
                [Op.not]: "matched",
              },
            },
          ],
        },
      ],
    },
    include: [
      {
        model: db.User,
        as: "UserOne",
        attributes: ["id", "email", "name", "breed"],
      },
      {
        model: db.User,
        as: "UserTwo",
        attributes: ["id", "email", "name", "breed"],
      },
    ],
  })
    .then((results) => {
      console.log(results);
      res.json({
        success: true,
        data: results,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

const generateSetArray = async (array) => {
  console.log("Called the function");
  let idSet = new Set();
  for (let i = 0; i < array.length; i++) {
    console.log(idSet);
    await idSet.add(array[i].UserOneId);
    await idSet.add(array[i].UserTwoId);
  }
  let newArray = await Array.from(idSet);
  return await newArray;
};

router.get("/:id/new", (req, res) => {
  db.UserMatch.findAll({
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            { UserOneId: req.params.id },
            {
              userOneStatus: {
                [Op.not]: "matched",
              },
            },
          ],
        },
        {
          [Op.and]: [
            { UserTwoId: req.params.id },
            {
              userTwoStatus: {
                [Op.not]: "matched",
              },
            },
          ],
        },
      ],
    },
  })
    .then(async (results) => {
      const newResult = await generateSetArray(results);
      await console.log(newResult);
      await db.User.findOne({
        where: {
          id: {
            [Op.notIn]: newResult,
          },
        },
        attributes: [
          "id",
          "email",
          "name",
          "breed",
          "age",
          "location",
          "imageURL",
        ],
      })
        .then((singleNewUser) => {
          console.log(singleNewUser);
          if (singleNewUser) {
            res.json({
              success: true,
              data: singleNewUser,
              message: "Found new user to match with.",
            });
          } else {
            res.json({
              success: false,
              data: null,
              message: "No additional users available.",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
