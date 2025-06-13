const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to authenticate JWT tokens for protected routes.
 * Extracts the token from the Authorization header and verifies it.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Callback to pass control to the next middleware.
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Check if token is present
  if (!token) {
    console.warn("Encabezado de autorización no proporcionado.");
    return res.status(401).json({ error: "Token no proporcionado." });
  }

  // Verify token validity
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Error al verificar el token JWT:", err.message);
      return res.status(403).json({ error: "Token inválido o expirado." });
    }

    // Attach decoded user ID to request object
    req.user = {
      userId: decoded.userId
    };

    console.log(`Usuario autenticado: ${req.user.userId}`);
    next();
  });
};

module.exports = authenticateToken;
