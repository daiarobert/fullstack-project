const express = require("express");
const db = require("../../db/db");
const router = express.Router();

// Get all Members
router.get("/members", (req, res) => {
  let sql = "SELECT * FROM member";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("error");
    } else {
      res.send(result);
    }
  });
});

// Get a specific Member by Id
router.get("/member/:id", (req, res) => {
  const memberId = req.params.id;
  let sql = "SELECT * FROM member WHERE id = ?";
  db.query(sql, [memberId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("error");
    } else if (result.length === 0) {
      res.status(404).send("Member not found.");
    } else {
      res.send(result[0]);
    }
  });
});

// Update Member information
router.put("/member/:id", (req, res) => {
  const memberId = req.params.id;
  const { name, team_id } = req.body;

  let sql = "UPDATE member SET name = ? SET team_id = ? WHERE id = ?";
  db.query(sql, [name, team_id, memberId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Member not found");
    } else {
      res.send("Member updated successfully");
    }
  });
});

// Add a new Member
router.post("/members", (req, res) => {
  const { name, team_id } = req.body;

  let sql = "INSERT INTO member (name, team_id) VALUES (?, ?)";
  db.query(sql, [name, team_id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else {
      res.send("Member added successfully");
    }
  });
});

// Delete Member by Id
router.delete("/member/:id", (req, res) => {
  const memberId = req.params.id;

  let sql = "DELETE FROM member WHERE id =?";
  db.query(sql, [memberId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Member not found");
    } else {
      res.send("Member deleted successfully");
    }
  });
});

// Get all Members from a specific Team
router.get("/members/team/:teamId", (req, res) => {
  const teamId = req.params.teamId;

  let sql = "SELECT * FROM member WHERE team_id = ?";
  db.query(sql, [teamId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else {
      res.send(result);
    }
  });
});

// Update the name of a Member
router.put("/memberId/:memberId/name", (req, res) => {
  const memberId = req.params.memberId;
  const newName = req.body.name;

  // Update the member name in the database
  const sql = "UPDATE member SET name = ? WHERE id = ?";
  db.query(sql, [newName, memberId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating member name");
    } else {
      res.send("Member name updated successfully");
    }
  });
});

// Update the Team of a Member
router.put("/member/:memberId/team/:teamId", (req, res) => {
  const memberId = req.params.memberId;
  const teamId = req.params.teamId;

  // Check if the team exists
  const checkTeamSql = "SELECT id FROM team WHERE id = ?";
  db.query(checkTeamSql, [teamId], (err, result) => {
    if (err) {
      console.error("Error checking team existence:", err);
      res.status(500).send("Error checking team existence");
    } else if (result.length === 0) {
      res.status(404).send("Team not found");
    } else {
      // Update the member's team in the database
      const updateMemberSql = "UPDATE member SET team_id = ? WHERE id = ?";
      db.query(updateMemberSql, [teamId, memberId], (err, result) => {
        if (err) {
          console.error("Error updating member team:", err);
          res.status(500).send("Error updating member team");
        } else {
          res.send("Member team updated successfully");
        }
      });
    }
  });
});

module.exports = router;
