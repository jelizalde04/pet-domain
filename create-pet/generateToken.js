const jwt = require("jsonwebtoken");
require("dotenv").config();

const payload = {
  userId: "f980701c-ee76-44ed-8bc1-fea8f2145aff" 
};

const token = jwt.sign(
  payload,
  process.env.JWT_SECRET || "7f9d1b0e822a4f94b5ef1fc6aaf7c09a4d37353bd8c9471cb34f223b4e0f8af5",
  { expiresIn: "1h" }
);

console.log("TOKEN:", token);
console.log("Usa este responsibleId:", payload.userId);