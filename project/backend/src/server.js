/* 

This file is the global server.js file that will be executed when the container is run, all other directories and files will handle actual business logic

See this file as the core and all actual code as imports like python.

*/

const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Hello From Node JS Backend!");
});

//creates a connection pool with MySQL, more efficient then creating a connection for every request.
const pool = mysql.createPool({
  connectionLimit: 10, // This is the max number of connections in the pool
  host: process.env.DB_HOST_DOCKER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

//http://localhost:3000/testDB
app.get("/testDB", async (req, res) => {
  try {
    const connection = await pool.getConnection();

    res.send("Successfully Connected to the Database!");
  } catch (error) {
    console.log(error);
    res.send("Failed to Establish Database Connection, Check Backend Logs");
  }
});

// Make the app listen on port 3000
app.listen(3000, () => {
  console.log(
    `Server is running on http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`
  );
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

/* 
External Routes Imported Below:

Routes (Likely Most of the Tables):
- Users
- Grades etc..
*/

const userRoutes = require("./routes/userRoutes.js");
app.use("/user", userRoutes(pool));

const classesRoutes = require("./routes/classesRoutes.js");
app.use("/classes", classesRoutes(pool));
