const express = require("express");
const router = express.Router();

// Define a GET route
router.get("/signup", (req, res) => {
  res.send("This is an example signup route!");
});

//this is essential:
module.exports = router;
