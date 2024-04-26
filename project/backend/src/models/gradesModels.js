async function getAssignmentGradesByClass(pool, username, classId) {
  try {
    const sqlQuery = `
        SELECT a.assignment_id, a.title, a.category, a.total_points, uag.points_earned, uag.grade
        FROM Assignments a
        JOIN User_Classes uc ON a.class_id = uc.class_id
        LEFT JOIN User_Assignment_Grades uag ON a.assignment_id = uag.assignment_id AND uag.username = uc.username
        WHERE uc.username = ? AND uc.class_id = ?
        ORDER BY a.assignment_id;
    `;
    const [rows, fields] = await pool.query(sqlQuery, [username, classId]);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getCategoryGradesByClass(pool, username, classId) {
  try {
    const sqlQuery = `
        SELECT *
        FROM User_Category_Grades
        WHERE username = ? AND class_id = ?;
    `;
    const [rows, fields] = await pool.query(sqlQuery, [username, classId]);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getCategoryAveragesByClass(pool, classId, category) {
  try {
    const sqlQuery = `
        SELECT grade
        FROM Category_Average_Grades
        WHERE class_id = ? AND category = ?;
    `;
    const [rows, fields] = await pool.query(sqlQuery, [classId, category]);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAssignmentGradesByClass,
  getCategoryGradesByClass,
  getCategoryAveragesByClass,
};
