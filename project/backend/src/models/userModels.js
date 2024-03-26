async function getUsers(pool) {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM Users");
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(pool, username) {
  try {
    const [rows, fields] = await pool.query(
      "SELECT * FROM Users WHERE username = ?",
      [username]
    );
    if (rows.length > 0) {
      return rows[0];
    } else {
      throw new Error(`User with ID ${userId} not found`);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUsers,
  getUserByUsername,
};
