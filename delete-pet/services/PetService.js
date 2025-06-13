const Pet = require("../models/Pet");

/**
 * Deletes a pet by its ID if the authenticated user has permission.
 *
 * @param {string} id - UUID of the pet to delete
 * @param {string} authenticatedUserId - ID of the authenticated user requesting deletion
 * @throws Will throw an error if the ID is invalid, pet not found, or user unauthorized.
 */
const deletePetById = async (id, authenticatedUserId) => {
  // Validate UUID format
  const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
  if (!isUUID) {
    const error = new Error("ID no es válido");
    error.status = 400;
    throw error;
  }

  // Find the pet by primary key
  const pet = await Pet.findByPk(id);

  if (!pet) {
    const error = new Error("Mascota no encontrada");
    error.status = 404;
    throw error;
  }

  if (authenticatedUserId && pet.responsibleId !== authenticatedUserId) {
    const error = new Error("No tienes permiso para eliminar esta mascota");
    error.status = 403;
    throw error;
  }

  // Delete the pet from the database
  await pet.destroy();
};

module.exports = { deletePetById };
