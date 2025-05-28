const PetService = require("../services/PetService");

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
