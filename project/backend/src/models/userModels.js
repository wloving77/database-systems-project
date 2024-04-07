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
    console.error("Insert operation failed", error.message);
    throw error;
  }
}

async function insertNewUser(
  pool,
  username,
  password_hash,
  first_name,
  last_name
) {
  try {
    const queryText =
      "INSERT INTO Users (username, password_hash, first_name, last_name) VALUES (?,?,?,?)";

    const [rows, fields] = await pool.query(queryText, [
      username,
      password_hash,
      first_name,
      last_name,
    ]);

    console.log(`Inserted User with Username: ${username}`);
    return username;
  } catch (error) {
    console.error("Insert operation failed", error.message);
    throw error;
  }
}

module.exports = {
  getUsers,
  getUserByUsername,
  insertNewUser,
};
