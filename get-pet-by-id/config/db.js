const { Sequelize } = require("sequelize");

// Carga las variables de entorno
require("dotenv").config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST, // DB Host
  username: process.env.DB_USER, // DB User
  password: process.env.DB_PASSWORD, // DB Password
  database: process.env.DB_NAME, // DB Name
  dialect: "postgres", // Usamos PostgreSQL
  port: process.env.DB_PORT, // Puerto de la base de datos
dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false 
    }
  }
});

module.exports = sequelize;
