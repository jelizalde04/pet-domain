const { getAllUserPets } = require("../services/PetService");

const getAllPets = async (req, res) => {
  try {
    const authenticatedUserId = req.user?.id;

    if (!authenticatedUserId) {
      const error = new Error("ID del usuario no válido.");
      error.status = 400;
      throw error;
    }

    const pets = await getAllUserPets(authenticatedUserId);

    if (pets.length === 0) {
      return res.status(404).json({ message: "No tienes mascotas registradas." });
    }

    return res.status(200).json(pets);
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || "Error inesperado",
      details: error.details || null,
    });
  }
};

module.exports = { getAllPets };
