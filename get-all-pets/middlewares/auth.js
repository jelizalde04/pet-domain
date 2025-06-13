const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.warn("Falta el encabezado de autorización");
    return res.status(401).json({ error: "Token no proporcionado." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Falló la verificación del JWT:", err.message);
      return res.status(403).json({ error: "Token inválido o expirado." });
    }

    req.user = {
      id: decoded.userId
    };

    console.log("Payload decodificado del JWT:", decoded);
    console.log(`Usuario autenticado: ${req.user.id}`);

    next();
  });
};

module.exports = authenticateToken;
