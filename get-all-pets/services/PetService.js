const Pet = require("../models/Pet");
const Responsible = require("../models/Responsible");

/**
 * Retrieves all pets belonging to a user along with their responsible's details.
 *
 * @param {string} userId - UUID of the authenticated user
 * @throws {Error} Throws an error if userId is missing or responsible not found
 * @returns {Promise<Array>} Array of pet objects enriched with responsible data
 */
const getAllUserPets = async (userId) => {
  // Validate presence of userId
  if (!userId) {
    const error = new Error("ID del usuario es obligatorio.");
    error.status = 400;
    throw error;
  }

  // Fetch all pets linked to the given userId
  const pets = await Pet.findAll({
    where: {
      responsibleId: userId,
    },
  });

  // Fetch the responsible details for each pet
  const petsWithResponsibles = await Promise.all(
    pets.map(async (pet) => {
      const responsibleId = pet.responsibleId;

      // Query responsible model by ID
      const responsible = await Responsible.findOne({
        where: { id: responsibleId },
      });

      if (!responsible) {
        const error = new Error("Responsable no encontrado.");
        error.status = 404;
        throw error;
      }

      // Combine pet data with responsible details
      return {
        ...pet.dataValues,
        responsible: responsible.dataValues,
      };
    })
  );

  return petsWithResponsibles;
};

module.exports = { getAllUserPets };
