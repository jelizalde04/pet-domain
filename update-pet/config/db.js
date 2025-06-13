const { Sequelize } = require("sequelize");
require("dotenv").config();

/**
 * Initializes a Sequelize instance for PostgreSQL connection using environment variables.
 * SSL is enabled for secure connections, with relaxed certificate validation.
 */
const sequelize = new Sequelize({
  host: process.env.DB_HOST,             // Database host
  username: process.env.DB_USER,         // Database username
  password: process.env.DB_PASSWORD,     // Database password
  database: process.env.DB_NAME,         // Database name
  dialect: "postgres",                   // SQL dialect
  port: process.env.DB_PORT,             // Database port

  dialectOptions: {
    ssl: {
      require: true,                     // Force SSL usage
      rejectUnauthorized: false         // Allow self-signed certificates
    }
  }
});

module.exports = sequelize;
