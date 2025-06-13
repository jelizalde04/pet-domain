const express = require("express");
const cors = require("cors");
const { petDb, responsibleDb } = require("./config/db");
const setupSwagger = require("./swagger");
const petRoutes = require("./routes/petGetRoutes");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Setup Swagger for API documentation
setupSwagger(app);

// API routes for pets and their responsible users
app.use("/pets", petRoutes);

const PORT = process.env.PORT || 3003;

async function startServer() {
  try {
    // Authenticate connection to pets database
    await petDb.authenticate();
    console.log("Pet Database connected.");

    // Authenticate connection to responsible users database
    await responsibleDb.authenticate();
    console.log("Responsible Database connected.");

    // Synchronize pet models with the database
    await petDb.sync();
    console.log("Pet Database synchronized with models.");

    // Start the server and listen on the specified port
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    // Log errors and exit process if database connections or sync fail
    console.error("Error connecting to the databases or syncing models:");
    console.error(err);
    process.exit(1);
  }
}

// Call function to start the server
startServer();
