const Pet = require("../models/Pet");

const createPet = async (petData, authenticatedUserId) => {
  const { name } = petData;

  if (!name) {
    const error = new Error("El nombre de la mascota es obligatorio.");
    error.status = 400;
    throw error;
  }

  const responsibleId = authenticatedUserId;

  if (!responsibleId) {
    const error = new Error("ID del responsable no válido.");
    error.status = 400;
    throw error;
  }

  const existingPet = await Pet.findOne({
    where: { name, responsibleId }
  });

  if (existingPet) {
    const error = new Error("Ya tienes una mascota con este nombre.");
    error.status = 400;
    throw error;
  }

  const petToCreate = {
    ...petData,
    responsibleId,
  };

  const pet = await Pet.create(petToCreate);
  console.log(`Pet created successfully: ${pet.id}`);
  return pet;
};

module.exports = { createPet };
