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
      return -1;
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

async function updateUsernameForUser(pool, originalUsername, newUsername) {
  // Ensure that new usernames are not empty and handle SQL injection
  if (!newUsername || newUsername.trim() === "") {
    throw new Error("New username cannot be empty.");
  }

  const query = `
    UPDATE Users
    SET username = ?
    WHERE username = ?;
  `;

  try {
    const [result] = await pool.execute(query, [
      newUsername.trim(),
      originalUsername,
    ]);
    if (result.affectedRows === 0) {
      throw new Error(
        "No user found with the specified username. No update was made."
      );
    }
    return 1;
  } catch (error) {
    console.error("Failed to update username:", error);
    throw error;
  }
}

module.exports = {
  getUsers,
  getUserByUsername,
  insertNewUser,
  updateUsernameForUser,
};
