const express = require("express");
const router = express.Router();
const classesController = require("../controllers/classesController");

module.exports = function (pool) {
  router.get("/get/:username", classesController.getClassesByUsername(pool));

  router.get("/all", classesController.getAllClasses(pool));

  router.get("/class/:id", classesController.getClassById(pool));

  router.get("/class/:id/avg", classesController.getClassAverageGrades(pool));

  router.post("/addClass", classesController.addClass(pool));

  router.post("/deleteClass", classesController.deleteClass(pool));

  return router;
};
