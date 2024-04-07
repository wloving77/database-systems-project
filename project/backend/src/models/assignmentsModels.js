const fs = require("fs");
const path = require("path");

async function getAllAssignments(pool) {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM Assignments;");
    if (rows.length > 0) {
      return rows;
    } else {
      throw new Error(`No classes found`);
    }
  } catch (error) {
    throw error;
  }
}

async function getAssignmentsByUsername(pool, username) {
  const sqlQuery = `
    SELECT uag.assignment_id, uag.username, uag.points_earned,
        uag.grade, a.title, c.class_title
    FROM User_Assignment_Grades uag
    JOIN Assignments a ON uag.assignment_id = a.assignment_id
    JOIN Classes c ON c.class_id = a.class_id
    WHERE uag.username = ?;
  `;

  try {
    const [rows, fields] = await pool.query(sqlQuery, [username]);
    if (rows.length > 0) {
      return rows;
    } else {
      //using -1 as the return type when there is no data
      return -1;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllAssignments,
  getAssignmentsByUsername,
};
