const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const setupSwagger = require("./swagger");
const petGetRoutes = require("./routes/petGetRoutes");

const app = express();
app.use(cors());
// Middleware
app.use(express.json());

// Swagger Documentation
setupSwagger(app);

// Routes
app.use("/api", petGetRoutes);

// Database Connection and Server Startup
sequelize.authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente");

    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => {
      console.log(`Servicio de consulta de mascotas corriendo en puerto ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  });

module.exports = app;
