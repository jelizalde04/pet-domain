const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const setupSwagger = require("./swagger");
const petRoutes = require("./routes/petRoutes");

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse incoming JSON requests

/**
 * Initialize Swagger API documentation
 * @param {Express.Application} app - The Express application instance
 */
setupSwagger(app);

// API routes for pets
app.use("/pets", petRoutes);

const PORT = process.env.PORT || 3005;

/**
 * Start the Express server only after successful database connection and synchronization.
 * Logs success or failure messages in Spanish.
 */
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Base de datos conectada.");

    await sequelize.sync();
    console.log("✅ Base de datos sincronizada con los modelos.");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Error conectando o sincronizando la base de datos:", err.message);
    process.exit(1); // Exit process on failure
  }
}

startServer();
