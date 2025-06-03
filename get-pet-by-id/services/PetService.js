const Pet = require("../models/Pet");

const getPetByIdService = async (id, authenticatedUserId) => {
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
    const error = new Error("No tienes permiso para ver esta mascota.");
    error.status = 403;
    throw error;
  }

  return pet;
};

module.exports = { getPetByIdService };
