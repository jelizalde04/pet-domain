const { responsibleDb } = require("../config/db");  
const { Sequelize, DataTypes } = require("sequelize");  

const Responsible = responsibleDb.define("Responsible", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,  
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,  
  }
});

module.exports = Responsible;
