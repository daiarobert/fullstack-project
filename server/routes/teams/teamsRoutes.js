const express = require("express");
const db = require("../../db/db");
const router = express.Router();

// Get all Teams
router.get("/teams", (req, res) => {
  let sql = "SELECT * FROM team";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occured");
    } else {
      res.send(result);
    }
  });
});

// Get Team details by Id
router.get("/teams/:id", (req, res) => {
  const teamId = req.params.id;

  let sql = `
    SELECT Team.name AS team_name, GROUP_CONCAT(Member.name SEPARATOR ', ') AS member_names
    FROM Team
    LEFT JOIN Member ON Team.id = Member.team_id
    WHERE Team.id = ?
    GROUP BY Team.id
  `;

  db.query(sql, [teamId], (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send("An error occurred while fetching the team details.");
    } else if (result.length === 0) {
      res.status(404).send("Team not found.");
    } else {
      const teamDetails = result[0];
      const memberNames = teamDetails.member_names || "";
      const formattedNames = memberNames
        ? memberNames
            .split(", ")
            .join(", ")
            .replace(/, ([^,]*)$/, " & $1")
        : "";
      const teamWithMembers = {
        team_name: teamDetails.team_name,
        member_names: formattedNames,
      };
      res.send(teamWithMembers);
    }
  });
});

// Add a new Team
router.post("/teams", (req, res) => {
  const { name } = req.body;

  let sql = "INSERT INTO team (name) VALUES (?)";
  db.query(sql, [name], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else {
      res.send("Member added successfully");
    }
  });
});

// Delete all members of a Team
router.delete("/team/:id", (req, res) => {
  const teamId = req.params.id;

  let sql = "DELETE FROM team WHERE id = ?";
  db.query(sql, [teamId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Team not found");
    } else {
      res.send("Team deleted successfully");
    }
  });
});

// Update the name of a Team
router.delete("/team/:teamId/members", (req, res) => {
  const teamId = req.params.teamId;

  let sql = "DELETE FROM member WHERE team_id = ?";
  db.query(sql, [teamId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    } else {
      res.send("Members deleted successfully");
    }
  });
});

router.put("/team/:teamId/name", (req, res) => {
  const teamName = req.params.teamId;
  const name = req.body.name;

  const sql = "UPDATE team SET name = ? WHERE name = ?";
  db.query(sql, [name, teamName], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating team name");
    } else {
      res.send("Team name updated successfully");
    }
  });
});

router.get("/teams/:id", (req, res) => {
  const teamId = req.params.id;

  let sql = `
    SELECT Team.name AS team_name, GROUP_CONCAT(Member.name SEPARATOR ', ') AS member_names
    FROM Team
    LEFT JOIN Member ON Team.id = Member.team_id
    WHERE Team.id = ?
    GROUP BY Team.id
  `;

  db.query(sql, [teamId], (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send("An error occurred while fetching the team details.");
    } else if (result.length === 0) {
      res.status(404).send("Team not found.");
    } else {
      const teamDetails = result[0];
      const memberNames = teamDetails.member_names.split(", ");
      const formattedNames = memberNames
        .join(", ")
        .replace(/, ([^,]*)$/, " & $1");
      const teamWithMembers = {
        team_name: teamDetails.team_name,
        member_names: formattedNames,
      };
      res.send(teamWithMembers);
    }
  });
});
module.exports = router;
