const Pet = require("../models/Pet");
const { updatePetProfile, uploadImageToS3, updatePetImageInDatabase, deletePetImageFromS3 } = require("../services/PetService");

const updatePet = async (req, res) => {
  try {
    const petId = req.params.id;
    const authenticatedUserId = req.user?.id;  
    const updatedPet = await updatePetProfile(petId, req.body, authenticatedUserId);
    res.json(updatedPet);
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || "Error inesperado",
      details: error.details || null,
    });
  }
};


const updatePetImage = async (req, res) => {
  try {
    const petId = req.params.id;
    const authenticatedUserId = req.user?.id;

   
    const pet = await Pet.findByPk(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

   
    if (pet.responsibleId !== authenticatedUserId) {
      return res.status(403).json({ message: 'No tienes permiso para modificar la imagen de esta mascota' });
    }

    
    if (pet.image) {
      await deletePetImageFromS3(pet.image);
    }

  
    const imageUrl = await uploadImageToS3(req.file, petId);

   
    await updatePetImageInDatabase(petId, imageUrl);


    res.status(200).json({ message: 'Imagen de la mascota actualizada correctamente', imageUrl });
  } catch (error) {
    console.error('Error al actualizar la imagen de la mascota:', error);
    res.status(500).json({ message: 'Error al actualizar la imagen de la mascota' });
  }
};

module.exports = { updatePet, updatePetImage };
