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

async function addAssignmentByClassAndUser(
  pool,
  class_id,
  assignment_name,
  assignment_category,
  total_points
) {
  const query =
    "INSERT INTO Assignments (title, class_id, category, total_points) VALUES (?,?,?,?)";

  try {
    const [result] = await pool.execute(query, [
      assignment_name,
      class_id,
      assignment_category,
      total_points,
    ]);

    return 1;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      console.log("Assignment already exists. Returning 1 as specified.");
      return 1;
    } else {
      console.error("Error executing the query: ", error);
      throw error;
    }
  }
}

async function addAssignmentGrade(
  pool,
  username,
  assignment_id,
  points_earned,
  total_points
) {
  const query =
    "INSERT INTO User_Assignment_Grades (assignment_id, username, points_earned, grade) VALUES (?,?,?,?)";

  try {
    const [result] = await pool.execute(query, [
      assignment_id,
      username,
      points_earned,
      total_points,
    ]);

    return 1;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      console.log("Assignment already exists. Returning 1 as specified.");
      return 1;
    } else {
      console.error("Error executing the query: ", error);
      throw error;
    }
  }
}

module.exports = {
  getAllAssignments,
  getAssignmentsByUsername,
  addAssignmentByClassAndUser,
  addAssignmentGrade,
};
