const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

module.exports = function (pool) {
  router.get("/get/:username", userController.getUserByUsername(pool));

  router.get("/all", userController.getUsers(pool));

  router.post("/login", userController.handleUserLogin(pool));

  router.post("/signup", userController.handleUserSignup(pool));

  router.post("/updateUser", userController.updateUser(pool));

  return router;
};
