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
      const { username, password } = req.body;

      const user = await userModel.getUserByUsername(pool, username);
      const hashedPassword = user.password_hash;

      console.log(hashedPassword);

      /* Here is where hashing would happen, we'd hash the sent password and ensure it matches our db's hash */
      const sentPasswordHashed = password;

      if (sentPasswordHashed === hashedPassword) {
        res.json({ username: user.username });
      } else {
        res.status(401);
      }
    } catch (error) {
      res.status(500);
    }
  };
};

const handleUserLogout = (pool) => async (req, res) => {
  return 0;
};

module.exports = {
  getUsers,
  getUserByUsername,
  handleUserLogin,
  handleUserLogout,
};
