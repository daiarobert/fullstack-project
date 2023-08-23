const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const isAuth = require("./middleware/IsAuthenticated");
const authMiddleware = require("./middleware/IsAuthenticated");
// const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const membersRoutes = require("./routes/members/membersRoutes");
const teamsRoutes = require("./routes/teams/teamsRoutes");
const loginRoutes = require("./routes/login/login");
const registerRoutes = require("./routes/login/register");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// Mount the login and register routes
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

// Middleware for authentication (it must be mounted before protected routes)
app.use(authMiddleware);

// Mount the member and team routes
app.use("/", membersRoutes);
app.use("/", teamsRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
