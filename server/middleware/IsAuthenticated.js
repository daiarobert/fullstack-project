const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.cookies.jwt; // Extract the token from the "jwt" cookie

  if (!token) {
    // If the token is not present, send a 401 Unauthorized status
    return res.status(401).send("Unauthorized");
  }

  try {
    const decodedToken = jwt.verify(token, "your-secret-key");
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error(err);
    // If the token is invalid or expired, send a 401 Unauthorized status
    return res.status(401).send("Unauthorized");
  }
}

module.exports = authMiddleware;
