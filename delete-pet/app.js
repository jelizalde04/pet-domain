const express = require("express");
const cors = require("cors");
const { petDb } = require('./config/db');
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
app.use("/pets/delete/", petRoutes);
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Service is healthy' });
});

const PORT = process.env.PORT || 3005;

/**
 * Start the Express server only after successful database connection and synchronization.
 * Logs success or failure messages in Spanish.
 */
async function startServer() {
  try {
    // Conexión a base de datos de mascotas
    await petDb.authenticate();
    console.log('✅ Conexión exitosa a la base de datos de mascotas.');

    // Sincronización de modelos 
    await petDb.sync({ alter: true });  
    console.log('🔄 Bases de datos sincronizadas.');
 

    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Error al conectar o sincronizar la base de datos:", err.message);
    process.exit(1);
  }
}

startServer();
