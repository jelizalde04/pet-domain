const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const setupSwagger = require("./swagger");
const petRoutes = require("./routes/petRoutes");

const app = express();
app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("/pets", petRoutes);

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida.");

    await sequelize.sync();
    console.log("✅ Base de datos sincronizada con los modelos.");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Error al conectar o sincronizar la base de datos:", err.message);
    process.exit(1);
  }
}

startServer();
