const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to authenticate JWT token from Authorization header.
 * Extracts the token, verifies it, and attaches user info to req.user.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticateToken = (req, res, next) => {
  // Extract token from Authorization header ("Bearer <token>")
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.warn("Authorization header missing");
    return res.status(401).json({ error: "Token no proporcionado." });
  }

  // Verify token with JWT_SECRET
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err.message);
      return res.status(403).json({ error: "Token inválido o expirado." });
    }

    // Attach userId from decoded token to req.user for further use
    req.user = {
      id: decoded.userId, // Make sure 'userId' exists in the JWT payload
    };

    console.log("Decoded JWT payload:", decoded);
    console.log(`User authenticated: ${req.user.id}`);

    next();
  });
};

module.exports = authenticateToken;
