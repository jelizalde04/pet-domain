
const { Sequelize, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../config/db");

const Pet = sequelize.define("Pet", {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
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
    references: {
      model: "Responsibles",  
      key: "id",
    },
  },
});


Pet.belongsTo(Pet, { foreignKey: "responsibleId" }); 

module.exports = Pet;