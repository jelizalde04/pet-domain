const Pet = require("../models/Pet");

/**
 * Creates a new pet profile associated with the authenticated user.
 *
 * @param {Object} petData - Data of the pet to be created.
 * @param {string} authenticatedUserId - ID of the authenticated user.
 * @returns {Promise<Object>} The created pet instance.
 * @throws {Error} When required fields are missing or a pet already exists with the same name.
 */
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
  console.log(`Mascota creada correctamente: ${pet.id}`);
  return pet;
};

module.exports = { createPet };
