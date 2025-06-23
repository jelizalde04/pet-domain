const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables

/**
 * Sequelize instance for the PET database connection.
 * Configured to connect to a PostgreSQL DB with SSL.
 */
const petDb = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.PET_DB_NAME,
  dialect: "postgres",
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = { petDb };
