const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to authenticate JWT tokens sent in the Authorization header.
 * If valid, it attaches the user ID to the request object.
 * Otherwise, it returns appropriate HTTP error responses in Spanish.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    console.warn("Authorization header missing");
    return res.status(401).json({ error: "Token no proporcionado." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err.message);
      return res.status(403).json({ error: "Token inválido o expirado." });
    }

    // Attach user ID from token payload to request object for further use
    req.user = {
      id: decoded.userId
    };

    console.log("Decoded JWT payload:", decoded);
    console.log(`User authenticated: ${req.user.id}`);

    next();
  });
};

module.exports = authenticateToken;
