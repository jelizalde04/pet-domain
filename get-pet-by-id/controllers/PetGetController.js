const { getPetByIdService } = require("../services/PetService");

const getPetById = async (req, res) => {
  try {
    const petId = req.params.id;
    const authenticatedUserId = req.user?.userId; 

    const pet = await getPetByIdService(petId, authenticatedUserId);

    res.status(200).json({
      success: true,
      data: pet,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Error inesperado",
      details: error.details || null,
    });
  }
};

module.exports = { getPetById };
