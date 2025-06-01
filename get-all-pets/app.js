const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const setupSwagger = require("./swagger");
const petRoutes = require("./routes/petRoutes");

const app = express();
app.use(cors());
app.use(express.json()); // Para manejar JSON

// Configura Swagger para la documentación
setupSwagger(app);

// Rutas de la API
app.use("/api", petRoutes);  // Asegúrate de que la ruta es "/api"


// Conexión a la base de datos y sincronización
const PORT = process.env.PORT || 3004;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
  console.log(`Server running on port ${PORT}`);
});