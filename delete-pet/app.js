const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db"); 
const setupSwagger = require("./swagger");
const petRoutes = require("./routes/petRoutes");

const app = express();
app.use(cors());
// Middleware
app.use(express.json());  // Para manejar JSON en las solicitudes

// Swagger Documentation
setupSwagger(app);  // Configura Swagger con la documentación de la API

// Rutas de la API
app.use("/api", petRoutes);  // Carga las rutas de las mascotas (que incluyen la ruta DELETE)


sequelize.authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente");

    const PORT = process.env.PORT || 3005;  
    app.listen(PORT, () => {
      console.log(`Servicio de consulta de mascotas corriendo en puerto ${PORT}`);
      console.log(`Documentación API: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);  // Si no se puede conectar a la base de datos, termina la ejecución
  });

module.exports = app;
