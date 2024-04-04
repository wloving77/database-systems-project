async function getAllClasses(pool) {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM Classes;");
    if (rows.length > 0) {
      return rows;
    } else {
      throw new Error(`No classes found`);
    }
  } catch (error) {
    throw error;
  }
}
async function getClassesByUsername(pool, username) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT c.class_title FROM Users u JOIN User_Classes uc ON u.username = uc.username JOIN Classes c ON uc.class_id = c.class_id WHERE u.username = ?;",
      [username]
    );
    if (rows.length > 0) {
      return rows;
    } else {
      throw new Error(`${userId} has no classes`);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllClasses,
  getClassesByUsername,
};
