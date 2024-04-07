const userModel = require("../models/userModels");

const getUsers = (pool) => async (req, res) => {
  try {
    const users = await userModel.getUsers(pool);
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserByUsername = (pool) => async (req, res) => {
  try {
    const username = req.params.username;
    const user = await userModel.getUserByUsername(pool, username);
    res.json(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//gonna do the password comparison here:
const handleUserLogin = (pool) => {
  return async (req, res) => {
    try {
      console.log(req.body);
      const { username, password } = req.body;

      const user = await userModel.getUserByUsername(pool, username);
      const hashedPassword = user.password_hash;

      /* Here is where hashing would happen, we'd hash the sent password and ensure it matches our db's hash */
      const sentPasswordHashed = password;

      if (sentPasswordHashed === hashedPassword) {
        res.json({ username: user.username });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (error) {
      res.status(500);
    }
  };
};

const handleUserSignup = (pool) => {
  return async (req, res) => {
    try {
      const { username, password, first_name, last_name } = req.body;

      /* HERE WE WOULD HASH THE PASSWORD */

      const password_hash = password;

      const user = await userModel.insertNewUser(
        pool,
        username,
        password_hash,
        first_name,
        last_name
      );

      res.json({ username: user });
    } catch (error) {
      res.status(500);
    }
  };
};

module.exports = {
  getUsers,
  getUserByUsername,
  handleUserLogin,
  handleUserSignup,
};
