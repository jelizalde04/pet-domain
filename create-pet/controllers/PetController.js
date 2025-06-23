const { uploadPetImageToS3 } = require("../services/PetService");
const PetService = require("../services/PetService");

/**
 * Controller for creating a pet profile.
 * Handles multipart/form-data requests (pet data + image upload).
 */
const createPetProfile = async (req, res) => {
  try {
    console.log("Contenido de req.body:", req.body);  // Debug: Log request body
    console.log("Contenido de req.file:", req.file);  // Debug: Log uploaded file metadata

    // Validate if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No image file was uploaded.' });
    }

    // Merge form data with the uploaded file
    const petData = {
      ...req.body,      // Spread existing form fields (name, breed, etc.)
      file: req.file    // Append the uploaded file object
    };

    /**
     * Create pet record in database and upload image to S3.
     * @param {Object} petData - Combined pet metadata and file object.
     * @param {string} req.user.userId - Authenticated user's ID from JWT.
     */
    const pet = await PetService.createPet(petData, req.user.userId);

    // Return 201 Created with the new pet record and image URL
    res.status(201).json(pet);
  } catch (error) {
    /**
     * Error handling:
     * - Uses error.status if defined (e.g., 400 for bad requests)
     * - Falls back to 500 for unhandled errors
     */
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { createPetProfile };