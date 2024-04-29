const express = require("express");
const router = express.Router();
const assignmentsController = require("../controllers/assignmentsController");

module.exports = function (pool) {
  router.get(
    "/get/:username",
    assignmentsController.getAssignmentsByUsername(pool)
  );

  router.get("/all", assignmentsController.getAllAssignments(pool));

  router.post("/addAssignment", assignmentsController.addAssignment(pool));

  router.post("/addGrade", assignmentsController.addGrade(pool));

  return router;
};
