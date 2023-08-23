const express = require("express");
const router = express.Router();
const db = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login route
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Find the admin by email in the database
  const sql = "SELECT * FROM admin WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else if (result.length === 0) {
      res.status(401).send("Invalid credentials");
    } else {
      const admin = result[0];

      // Compare the provided password with the hashed password in the database using bcrypt
      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (passwordMatch) {
        // Generate a JWT token with the admin's email as the payload
        const token = jwt.sign({ email: admin.email }, "your-secret-key", {
          expiresIn: "1h", // Token expiration time (optional)
        });

        // Set the token as a cookie
        res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration time

        // Send the admin's name along with the login response
        res.send({ message: "Login successful", name: admin.name });
      } else {
        res.status(401).send("Invalid credentials");
      }
    }
  });
});

module.exports = router;
