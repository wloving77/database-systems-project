const classesModels = require("../models/classesModels");

const getAllClasses = (pool) => async (req, res) => {
  try {
    const classes = await classesModels.getAllClasses(pool);
    res.json(classes);
  } catch (error) {
    console.error("Error getting classes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getClassesByUsername = (pool) => async (req, res) => {
  try {
    const username = req.params.username;
    const classes = await classesModels.getClassesByUsername(pool, username);

    if (classes == -1) {
      res.json({ classCount: 0 });
      return;
    }

    res.json({ classCount: classes.length, classes: classes });
  } catch (error) {
    console.error("Error getting classes for user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getClassById = (pool) => async (req, res) => {
  try {
    const class_id = req.params.id;
    const thisClass = await classesModels.getClassById(pool, class_id);
    res.json(thisClass);
  } catch (error) {
    console.error("Error getting class:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getClassAverageGrades = (pool) => async (req, res) => {
  try {
    const class_id = req.params.id;
    const classAvg = await classesModels.getClassAverageGrades(pool, class_id);
    res.json(classAvg);
  } catch (error) {
    console.error("Error getting class average grade:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllClasses,
  getClassesByUsername,
  getClassById,
  getClassAverageGrades,
};
