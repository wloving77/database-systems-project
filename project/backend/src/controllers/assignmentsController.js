const assignmentsModels = require("../models/assignmentsModels");

const getAllAssignments = (pool) => async (req, res) => {
  try {
    const assignments = await assignmentsModels.getAllAssignments(pool);
    res.json(assignments);
  } catch (error) {
    console.error("Error getting assignments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAssignmentsByUsername = (pool) => async (req, res) => {
  try {
    const username = req.params.username;
    const assignments = await assignmentsModels.getAssignmentsByUsername(
      pool,
      username
    );

    if (assignments == -1) {
      res.json({ assignmentCount: 0 });
      return;
    }

    res.json({ assignmentCount: assignments.length, assignments: assignments });
  } catch (error) {
    console.error("Error getting assignments for user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addAssignment = (pool) => async (req, res) => {
  try {
    const {
      username,
      class_id,
      assignment_title,
      assignment_category,
      total_points,
    } = req.body;

    const success = assignmentsModels.addAssignmentByClassAndUser(
      pool,
      class_id,
      assignment_title,
      assignment_category,
      total_points
    );

    if (success) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.error(error);
  }
};

const addGrade = (pool) => async (req, res) => {
  try {
    const { username, assignment_id, points_earned, grade } = req.body;

    console.log(req.body);

    const success = await assignmentsModels.addAssignmentGrade(
      pool,
      username,
      assignment_id,
      points_earned,
      grade
    );

    if (success == 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllAssignments,
  getAssignmentsByUsername,
  addAssignment,
  addGrade,
};
