const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../../db/db");

// Register route for adding a new admin
router.post("/admin", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the admin details into the database
    const sql = "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error registering admin");
      } else {
        res.send("Admin registered successfully");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error hashing password");
  }
});

module.exports = router;
