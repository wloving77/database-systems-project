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
    const sqlQuery = `
      SELECT c.class_id, c.class_title, ucg.grade
      FROM Users u
      JOIN User_Classes uc ON u.username = uc.username
      JOIN Classes c ON uc.class_id = c.class_id
      LEFT JOIN User_Class_Grades ucg ON uc.class_id = ucg.class_id AND ucg.username = u.username
      WHERE u.username = ?;
    `;
    const [rows, fields] = await pool.query(sqlQuery, [username]);
    if (rows.length > 0) {
      return rows;
    } else {
      throw new Error(`${userId} has no classes`);
    }
  } catch (error) {
    throw error;
  }
}

async function getClassById(pool, class_id) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM Classes WHERE class_id = ?;",
      [class_id]
    );
    if (rows.length > 0) {
      return rows[0];
    } else {
      throw new Error(`No class found`);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllClasses,
  getClassesByUsername,
  getClassById,
};
