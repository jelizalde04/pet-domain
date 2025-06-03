const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.warn("Authorization header missing");
    return res.status(401).json({ error: "Token no proporcionado." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err.message);
      return res.status(403).json({ error: "Token inválido o expirado." });
    }

    req.user = {
      userId: decoded.userId
    };
    console.log(`User authenticated: ${req.user.userId}`);
    next();
  });
};

module.exports = authenticateToken;