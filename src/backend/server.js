//Necessary Node Libraries, Express for Routes, Mysql2 for MySQL connection and CORS to allow communication with frontend.
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From Node JS Backend!");
});

const pool = mysql.createPool({
  connectionLimit: 10, // This is the max number of connections in the pool
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

//simple route to validate DB credentials and that you can connect
app.get("/testDB", (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    });

    res.send("Successfully Connected to the Database!");
  } catch (error) {
    console.log(error);
  }
});

// Make the app listen on port 3000
app.listen(3000, () => {
  console.log(`Server is running on http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`);
});

//graceful shutdown of database connections:
process.on("SIGINT", async () => {
  console.log("Received SIGINT. Shutting down gracefully.");
  await pool.end();
  process.exit(0);
});

//graceful shutdown of database connections:
process.on("SIGTERM", async () => {
  console.log("Received SIGTERM. Shutting down gracefully.");
  await pool.end();
  process.exit(0);
});
