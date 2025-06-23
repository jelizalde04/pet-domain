const { petDb } = require("../config/db");
const { DataTypes, Sequelize } = require("sequelize");

const Pet = petDb.define("Pet", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
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
    allowNull: true,
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
}, {
  tableName: "Pets",
  timestamps: true,
});

module.exports = Pet;
