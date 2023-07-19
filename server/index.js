const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const membersRoutes = require("./routes/members/membersRoutes");
const teamsRoutes = require("./routes/teams/teamsRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Mount the member routes on the root path
app.use("/", membersRoutes);

// Mount the team routes on the root path
app.use("/", teamsRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
