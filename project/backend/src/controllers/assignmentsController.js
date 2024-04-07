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

module.exports = {
  getAllAssignments,
  getAssignmentsByUsername,
};
