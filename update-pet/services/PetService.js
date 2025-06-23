const axios = require('axios');
const Pet = require("../models/Pet");


const uploadImageToS3 = async (file, petId) => {
  const fileName = `${petId}.jpg`;  
  const uploadUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/pet_profile/${fileName}`;

  try {
    
    const response = await axios.put(uploadUrl, file.buffer, {
      headers: { 'Content-Type': file.mimetype },  
    });

   
    if (response.status === 200) {
      const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/pet_profile/${fileName}`;
      return imageUrl;  
    } else {
      throw new Error('Error al subir la imagen a S3');
    }
  } catch (error) {
    console.error('Error al subir la imagen a S3:', error);
    throw new Error('Error al subir la imagen a S3');
  }
};


const deletePetImageFromS3 = async (imageUrl) => {
  try {
    const fileName = imageUrl.split('/').pop(); 
    const deleteUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/pet_profile/${fileName}`;

    
    const response = await axios.delete(deleteUrl);

    if (response.status === 204) {
      console.log('Imagen eliminada correctamente de S3');
    } else {
      throw new Error('Error al eliminar la imagen de S3');
    }
  } catch (error) {
    console.error('Error al eliminar la imagen de S3:', error);
    throw new Error('Error al eliminar la imagen de S3');
  }
};


const updatePetImageInDatabase = async (petId, imageUrl) => {
  try {
    await Pet.update({ image: imageUrl }, { where: { id: petId } });
  } catch (error) {
    console.error('Error al actualizar la imagen en la base de datos:', error);
    throw new Error('Error al actualizar la imagen en la base de datos');
  }
};


const updatePetProfile = async (id, updateData, authenticatedUserId) => {
  const { name } = updateData;

  if (!id) {
    const error = new Error("El ID de la mascota es obligatorio.");
    error.status = 400;
    throw error;
  }

  if (!authenticatedUserId) {
    const error = new Error("ID del responsable no válido.");
    error.status = 400;
    throw error;
  }

  const pet = await Pet.findByPk(id);

  if (!pet) {
    const error = new Error("Mascota no encontrada.");
    error.status = 404;
    throw error;
  }

  if (pet.responsibleId !== authenticatedUserId) {
    const error = new Error("No tienes permiso para actualizar esta mascota.");
    error.status = 403;
    throw error;
  }

  if (name) {
    const existingPet = await Pet.findOne({
      where: {
        name,
        responsibleId: authenticatedUserId,
      },
    });

    if (existingPet && existingPet.id !== pet.id) {
      const error = new Error("Ya tienes una mascota con este nombre.");
      error.status = 400;
      throw error;
    }
  }

  const allowedFields = ["name", "species", "breed", "birthdate"];
  const fieldsToUpdate = allowedFields.filter(field => updateData.hasOwnProperty(field));

  if (fieldsToUpdate.length === 0) {
    const error = new Error("No se proporcionaron campos válidos para actualizar.");
    error.status = 400;
    throw error;
  }

  fieldsToUpdate.forEach(field => {
    pet[field] = updateData[field];
  });

  await pet.save();
  console.log(`Mascota actualizada correctamente: ${pet.id}`);
  return pet;
};

module.exports = { uploadImageToS3, deletePetImageFromS3, updatePetImageInDatabase, updatePetProfile };
