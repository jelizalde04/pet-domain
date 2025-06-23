const { deletePetById } = require("../services/PetService");

const deletePet = async (req, res) => {
  try {
    const petId = req.params.id;
    const authenticatedUserId = req.user?.id;

    await deletePetById(petId, authenticatedUserId);

    res.status(200).json({ message: "Mascota eliminada correctamente" });
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.status || 500,
      message: error.message || "Error inesperado",
    });
  }
};

module.exports = { deletePet };
