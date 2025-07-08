const express = require("express");
const cors = require("cors");
const { petDb, responsibleDb } = require("./config/db");
const setupSwagger = require("./swagger");
const petRoutes = require("./routes/petRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
setupSwagger(app);

app.use("/pets", petRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Service is healthy" });
});

const PORT = process.env.PORT || 3004;

async function startServer() {
  try {
    await petDb.authenticate();
    console.log("Pet Database connected.");

    await responsibleDb.authenticate();
    console.log("Responsible Database connected.");

    await petDb.sync();
    console.log("Pet Database synchronized with models.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to the databases or syncing models:");
    console.error(err);
    process.exit(1);
  }
}

startServer();
