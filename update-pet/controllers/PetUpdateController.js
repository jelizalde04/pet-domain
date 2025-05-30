const { updatePetProfile } = require("../services/PetService");

const updatePet = async (req, res) => {
  try {
    const petId = req.params.id;
    const authenticatedUserId = req.user?.id;  // Accedemos a `id` aquí, que viene del middleware

    const updatedPet = await updatePetProfile(petId, req.body, authenticatedUserId);
    res.json(updatedPet);
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || "Error inesperado",
      details: error.details || null,
    });
  }
};

module.exports = { updatePet };
