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
  const sqlFilePath = path.join(__dirname, "sql_scripts/userAssignments.sql");
  const sqlQuery = fs.readFileSync(sqlFilePath, "utf8");

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
