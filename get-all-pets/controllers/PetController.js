const { getAllUserPets } = require("../services/PetService");

/**
 * Controller to retrieve all pets for the authenticated user.
 *
 * @param {Object} req - Express request object, expects req.user.id to be set
 * @param {Object} res - Express response object
 * @returns {JSON} - List of pets or an error message
 */
const getAllPets = async (req, res) => {
  try {
    const authenticatedUserId = req.user?.id;

    // Validate authenticated user ID
    if (!authenticatedUserId) {
      const error = new Error("ID del usuario no válido.");
      error.status = 400;
      throw error;
    }

    // Retrieve pets associated with the authenticated user
    const pets = await getAllUserPets(authenticatedUserId);

    if (pets.length === 0) {
      return res.status(404).json({ message: "No tienes mascotas registradas." });
    }

    // Return the list of pets
    return res.status(200).json(pets);
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || "Error inesperado",
      details: error.details || null,
    });
  }
};

module.exports = { getAllPets };
