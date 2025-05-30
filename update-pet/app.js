const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const setupSwagger = require("./swagger");
const petUpdateRoutes = require("./routes/petUpdateRoutes");

const app = express();
app.use(cors());
// Middlewares
app.use(express.json());

// Configurar Swagger
setupSwagger(app);

// Rutas de la API
app.use("/api", petUpdateRoutes);  // Usamos "/api" como prefijo de las rutas

// Conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");

    // Inicio del servidor
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
      console.log(`Servicio de actualización de mascotas corriendo en puerto ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error al iniciar el servicio:", error);
    process.exit(1);
  });

module.exports = app;
