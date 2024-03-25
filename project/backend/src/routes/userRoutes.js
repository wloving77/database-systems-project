const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

module.exports = function (pool) {
  router.get("/signup", (req, res) => {
    res.send("This is an example signup route!");
  });

  router.get("/get/:username", userController.getUserByUsername(pool));

  router.get("/all", userController.getUsers(pool));

  return router;
};
