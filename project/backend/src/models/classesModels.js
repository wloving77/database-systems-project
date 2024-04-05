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
      "SELECT  c.class_id, c.class_title FROM Users u JOIN User_Classes uc ON u.username = uc.username JOIN Classes c ON uc.class_id = c.class_id WHERE u.username = ?;",
      [username]
    );
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

async function getClassById(pool, class_id) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM Classes WHERE class_id = ?;",
      [class_id]
    );
    if (rows.length > 0) {
      return rows[0];
    } else {
      //using -1 as the return type when there is no data
      return -1;
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
