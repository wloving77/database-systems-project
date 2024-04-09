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

async function insertClass(pool, class_title ) {
  try {
    const [rows, fields] = await pool.query(
      "INSERT INTO Classes (class_title) VALUES (?)",
      [class_title]
    );
    return rows;
  }
  catch (error) {
    throw error;
  }
  
}
module.exports = {
  getAllClasses,
  getClassesByUsername,
  getClassById,
  insertClass,
};
