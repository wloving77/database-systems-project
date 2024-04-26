const express = require("express");
const router = express.Router();
const gradesController = require("../controllers/gradesController");

module.exports = function (pool) {
  // gets all assignment grades for a class by user
  router.get(
    "/get/assignment-grades/:username/:class_id",
    gradesController.getAssignmentGradesByClass(pool)
  );

  // gets all category grades for a class by user
  router.get(
    "/get/category-grades/:username/:class_id",
    gradesController.getCategoryGradesByClass(pool)
  );

  router.get(
    "/get/category-grades/:class_id/:category/avg",
    gradesController.getCategoryAveragesByClass(pool)
  );

  return router;
};
