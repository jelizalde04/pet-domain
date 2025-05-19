const Pet = require("../models/Pet");

const createPetProfile = async (req, res) => {
  try {
    // Extraer los datos necesarios de la solicitud
    const { name, responsibleId } = req.body;

    // Verificar si ya existe una mascota con el mismo nombre para el mismo responsable
    const existingPet = await Pet.findOne({
      where: {
        name: name,
        responsibleId: responsibleId,
      },
    });

    if (existingPet) {
      // Si la mascota ya existe, devolver un error
      return res.status(400).json({ error: "Ya tienes una mascota con este nombre." });
    }

    // Crear un perfil de mascota en la base de datos si no existe una duplicada
    const pet = await Pet.create(req.body);
    res.status(201).json(pet); // Responder con el objeto creado
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message }); // Manejo de errores
  }
};

module.exports = { createPetProfile };
