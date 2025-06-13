const { getPetByIdService } = require("../services/PetService");

/**
 * Controller to get a pet by its ID for the authenticated user.
 *
 * @param {Object} req - Express request object containing params and user info
 * @param {Object} res - Express response object used to send response
 * @returns {JSON} - JSON response with pet data or error message
 */
const getPetById = async (req, res) => {
  try {
    const petId = req.params.id; // Extract pet ID from URL parameters
    const authenticatedUserId = req.user?.id; // Extract user ID from decoded JWT token

    // Call service to retrieve pet info by petId and userId
    const pet = await getPetByIdService(petId, authenticatedUserId);

    // Respond with pet data and success status
    res.status(200).json({
      success: true,
      data: pet,
    });
  } catch (error) {
    // Handle errors, returning status and message in Spanish
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Error inesperado",
      details: error.details || null,
    });
  }
};

module.exports = { getPetById };
