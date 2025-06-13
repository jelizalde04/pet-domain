// models/Pet.js

const { petDb } = require("../config/db");
const { DataTypes } = require("sequelize");

const Pet = petDb.define("Pet", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  birthdate: {
    type: DataTypes.DATE,
  },
  residence: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  responsibleId: {
    type: DataTypes.UUID,
    allowNull: false,  
  },
});

module.exports = Pet;
