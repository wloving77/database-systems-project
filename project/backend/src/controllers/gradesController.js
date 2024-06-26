const gradesModels = require("../models/gradesModels");

const getAssignmentGradesByClass = (pool) => async (req, res) => {
  try {
    const username = req.params.username;
    const classId = req.params.class_id;
    const grades = await gradesModels.getAssignmentGradesByClass(
      pool,
      username,
      classId
    );
    res.json(grades);
  } catch (error) {
    console.error("Error getting assignment grades:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategoryGradesByClass = (pool) => async (req, res) => {
  try {
    const username = req.params.username;
    const classId = req.params.class_id;
    const grades = await gradesModels.getCategoryGradesByClass(
      pool,
      username,
      classId
    );
    res.json(grades);
  } catch (error) {
    console.error("Error getting category grades:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategoryAveragesByClass = (pool) => async (req, res) => {
  try {
    const classId = req.params.class_id;
    const category = req.params.category;
    const avg = await gradesModels.getCategoryAveragesByClass(
      pool,
      classId,
      category
    );
    res.json(avg);
  } catch (error) {
    console.error("Error getting category average grades:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAssignmentGradesByClass,
  getCategoryGradesByClass,
  getCategoryAveragesByClass,
};
