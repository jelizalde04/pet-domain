const express = require("express");
const sequelize = require("./config/db");
const setupSwagger = require("./swagger");
const petRoutes = require("./routes/petRoutes");

const app = express();
app.use(express.json()); // Para manejar JSON

// Configura Swagger
setupSwagger(app);

// Rutas de la API
app.use("/api", petRoutes); // Asegúrate de que las rutas estén en '/api'

// Conexión a la base de datos y sincronización
const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  try {
    // Verifica la conexión a la base de datos
    await sequelize.authenticate();
    console.log("Database connected.");

    // Sincroniza la base de datos con los modelos
    await sequelize.sync();
    console.log("Database synchronized with models.");
  } catch (err) {
    console.error("Error connecting to the database or syncing models:", err);
  }

  console.log(`Server running on port ${PORT}`);
  console.log(`Documentación API disponible en http://localhost:${PORT}/api-docs-create`);
});
