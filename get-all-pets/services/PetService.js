const Pet = require("../models/Pet");

const getAllUserPets = async (userId) => {
  if (!userId) {
    const error = new Error("ID del usuario es obligatorio.");
    error.status = 400;
    throw error;
  }

  const pets = await Pet.findAll({
    where: {
      responsibleId: userId,
    },
  });

  return pets;
};

module.exports = { getAllUserPets };
