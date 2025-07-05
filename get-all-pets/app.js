const express = require("express");
const cors = require("cors");
const { petDb, responsibleDb } = require("./config/db");
const setupSwagger = require("./swagger");
const petRoutes = require("./routes/petRoutes");

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Setup Swagger for API documentation
setupSwagger(app);

// API routes related to pets and responsibles
app.use("/pets/getAll", petRoutes);
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Service is healthy' });
});

const PORT = process.env.PORT || 3004;

/**
 * Initializes and starts the Express server after
 * verifying connections and syncing the databases.
 */
async function startServer() {
  try {
    // Authenticate connection with the pets database
    await petDb.authenticate();
    console.log("Pet Database connected.");

    // Authenticate connection with the responsibles database
    await responsibleDb.authenticate();
    console.log("Responsible Database connected.");

    // Sync pet models with the pet database
    await petDb.sync();
    console.log("Pet Database synchronized with models.");

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Error connecting to the databases or syncing models:");
    console.error(err);
    process.exit(1); // Exit process on failure
  }
}

startServer();
