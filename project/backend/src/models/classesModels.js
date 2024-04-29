async function getAllClasses(pool) {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM Classes;");
    if (rows.length > 0) {
      return rows;
    } else {
      return -1;
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

async function getClassAverageGrades(pool, class_id) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT grade FROM Class_Average_Grades WHERE class_id = ?;",
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

async function addClassByUsername(pool, classTitle, username) {
  let connection;

  console.log(classTitle, username);

  try {
    // Get a connection from the pool
    connection = await pool.getConnection();

    // Start a transaction
    await connection.beginTransaction();

    // Check if class already exists
    const [classes] = await connection.execute(
      "SELECT class_id FROM Classes WHERE class_title = ?",
      [classTitle]
    );

    let classId;
    if (classes.length > 0) {
      // Class already exists, use existing class_id
      classId = classes[0].class_id;
      console.log("Class already exists with ID: ", classId);
    } else {
      // Insert into Classes table as it does not exist
      const [classInsertResult] = await connection.execute(
        "INSERT INTO Classes (class_title) VALUES (?)",
        [classTitle]
      );
      classId = classInsertResult.insertId;
      console.log("Inserted new class with ID:", classId);
    }

    const [alreadyEnrolled] = await connection.execute(
      "SELECT * FROM User_Classes WHERE username = ? and class_id = ?",
      [username, classId]
    );

    if (alreadyEnrolled.length > 0) {
      //user is already enrolled in this class
      console.log("User already enrolled in course");
      return -1;
    }

    // Insert into User_Classes table
    const [userClassInsertResult] = await connection.execute(
      "INSERT INTO User_Classes (username, class_id) VALUES (?, ?)",
      [username, classId]
    );
    console.log("User enrolled in class successfully");

    // Commit transaction
    await connection.commit();

    return 1; // Indicating success
  } catch (error) {
    // Rollback in case of an error
    if (connection) await connection.rollback();
    console.error("Error in addClassByUsername:", error);
    return -1; // Indicating failure
  } finally {
    // Always release the connection
    if (connection) await connection.release();
  }
}

async function deleteClassByUsername(pool, classTitle, username) {
  let connection;

  console.log(classTitle, username);

  try {
    // Get a connection from the pool
    connection = await pool.getConnection();

    // Start a transaction
    await connection.beginTransaction();

    // First, find the class ID based on class title
    const [classResult] = await connection.execute(
      "SELECT class_id FROM Classes WHERE class_title = ?",
      [classTitle]
    );
    if (classResult.length === 0) {
      throw new Error("Class not found");
    }
    const classId = classResult[0].class_id;

    // Delete from User_Classes table
    await connection.execute(
      "DELETE FROM User_Classes WHERE username = ? AND class_id = ?",
      [username, classId]
    );
    console.log("User unenrolled from class successfully");

    // Optionally, remove the class entirely if no more users are enrolled
    await connection.execute(
      "DELETE FROM Classes WHERE class_id = ? AND NOT EXISTS (SELECT * FROM User_Classes WHERE class_id = ?)",
      [classId, classId]
    );
    console.log("Class deleted successfully if no more users are enrolled");

    // Commit transaction
    await connection.commit();

    return 1; // Indicating success
  } catch (error) {
    // Roll back the transaction in case of an error
    if (connection) await connection.rollback();
    console.error("Error in deleteClassByUsername:", error);
    return -1; // Indicating failure
  } finally {
    // Release the connection back to the pool
    if (connection) await connection.release();
  }
}

module.exports = {
  getAllClasses,
  getClassesByUsername,
  getClassById,
  getClassAverageGrades,
  addClassByUsername,
  deleteClassByUsername,
};
