const Pet = require("../models/Pet");
const Responsible = require("../models/Responsible");

/**
 * Service to get a pet by its ID along with its responsible user,
 * ensuring the authenticated user has access permission.
 *
 * @param {string} id - The ID of the pet to retrieve
 * @param {string} authenticatedUserId - The ID of the authenticated user (responsible)
 * @throws Will throw an error if validation fails, pet not found, or unauthorized access
 * @returns {Object} Pet data combined with responsible user data
 */
const getPetByIdService = async (id, authenticatedUserId) => {
  if (!id) {
    const error = new Error("Pet ID is required.");
    error.status = 400;
    throw error;
  }
  if (!authenticatedUserId) {
    const error = new Error("Invalid responsible user ID.");
    error.status = 400;
    throw error;
  }

  // Find pet by primary key (ID)
  const pet = await Pet.findByPk(id);

  if (!pet) {
    const error = new Error("Pet not found.");
    error.status = 404;
    throw error;
  }

  // Check if the authenticated user is the responsible for this pet
  if (pet.responsibleId !== authenticatedUserId) {
    const error = new Error("You do not have permission to view this pet.");
    error.status = 403;
    throw error;
  }

  // Retrieve responsible user's information
  const responsible = await Responsible.findOne({
    where: { id: pet.responsibleId },
  });

  if (!responsible) {
    const error = new Error("Responsible user not found.");
    error.status = 404;
    throw error;
  }

  // Combine pet data with responsible user data and return
  return {
    ...pet.dataValues,
    responsible: responsible.dataValues,
  };
};

module.exports = { getPetByIdService };
