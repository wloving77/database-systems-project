const classesModel = require("../models/classesModels");

const getClassesByUsername = (pool) => async (req, res) => {
  try {
    const username = req.params.username;
    const user = await classesModel.getClassesByUsername(pool, username);
    res.json(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getClassesByUsername,
};
