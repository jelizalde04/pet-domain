const Pet = require("../models/Pet");

const updatePetProfile = async (id, updateData, authenticatedUserId) => {
  const { name } = updateData;

  if (!id) {
    const error = new Error("El ID de la mascota es obligatorio.");
    error.status = 400;
    throw error;
  }

  if (!authenticatedUserId) {
    const error = new Error("ID del responsable no válido.");
    error.status = 400;
    throw error;
  }

  const pet = await Pet.findByPk(id);

  if (!pet) {
    const error = new Error("Mascota no encontrada.");
    error.status = 404;
    throw error;
  }

  if (pet.responsibleId !== authenticatedUserId) {
    const error = new Error("No tienes permiso para actualizar esta mascota.");
    error.status = 403;
    throw error;
  }

  if (name) {
    const existingPet = await Pet.findOne({
      where: {
        name,
        responsibleId: authenticatedUserId,
      },
    });

    if (existingPet && existingPet.id !== pet.id) {
      const error = new Error("Ya tienes una mascota con este nombre.");
      error.status = 400;
      throw error;
    }
  }

  const allowedFields = ["name", "species", "breed", "image", "birthdate"];
  const fieldsToUpdate = allowedFields.filter(field => updateData.hasOwnProperty(field));

  if (fieldsToUpdate.length === 0) {
    const error = new Error("No se proporcionaron campos válidos para actualizar.");
    error.status = 400;
    throw error;
  }

  fieldsToUpdate.forEach(field => {
    pet[field] = updateData[field];
  });

  await pet.save();
  console.log(`Mascota actualizada correctamente: ${pet.id}`);
  return pet;
};

module.exports = { updatePetProfile };
