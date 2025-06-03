const Pet = require("../models/Pet");

const deletePetById = async (id, authenticatedUserId) => {
  // Validar UUID
  const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
  if (!isUUID) {
    const error = new Error("ID no es válido");
    error.status = 400;
    throw error;
  }

  const pet = await Pet.findByPk(id);

  if (!pet) {
    const error = new Error("Mascota no encontrada");
    error.status = 404;
    throw error;
  }

  // Validar que el usuario autenticado sea responsable (opcional, si quieres control de acceso)
  if (authenticatedUserId && pet.responsibleId !== authenticatedUserId) {
    const error = new Error("No tienes permiso para eliminar esta mascota");
    error.status = 403;
    throw error;
  }

  await pet.destroy();
  return;
};

module.exports = { deletePetById };
