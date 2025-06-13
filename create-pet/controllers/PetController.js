const PetService = require("../services/PetService");

/**
 * Controller to handle pet profile creation.
 * Receives pet data from the request body and the authenticated user's ID.
 * 
 * @param {Object} req - Express request object containing pet data and user ID.
 * @param {Object} res - Express response object used to send the result or error.
 */
const createPetProfile = async (req, res) => {
  try {
    console.log("Contenido de req.body:", req.body);  
    const pet = await PetService.createPet(req.body, req.user.userId);
    res.status(201).json(pet);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { createPetProfile };
