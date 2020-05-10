const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const db = require("../models");

router.get("/:id/new", (req, res) => {
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

module.exports = router;
