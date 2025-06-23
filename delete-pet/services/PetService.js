const axios = require('axios');
const Pet = require("../models/Pet");

/**
 * Deletes a pet by its ID if the authenticated user has permission.
 *
 * @param {string} id - UUID of the pet to delete
 * @param {string} authenticatedUserId - ID of the authenticated user requesting deletion
 * @throws Will throw an error if the ID is invalid, pet not found, or user unauthorized.
 */
const deletePetById = async (id, authenticatedUserId) => {
  // Validate UUID format
  const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
  if (!isUUID) {
    const error = new Error("ID no es válido");
    error.status = 400;
    throw error;
  }

  // Find the pet by primary key
  const pet = await Pet.findByPk(id);

  if (!pet) {
    const error = new Error("Mascota no encontrada");
    error.status = 404;
    throw error;
  }

  if (authenticatedUserId && pet.responsibleId !== authenticatedUserId) {
    const error = new Error("No tienes permiso para eliminar esta mascota");
    error.status = 403;
    throw error;
  }

  // Eliminar imagen de S3 antes de eliminar el registro de la base de datos
  if (pet.image) {
    await deleteImageFromS3(pet.image);  // Llamamos a la función que elimina la imagen de S3
  }

  // Delete the pet from the database
  await pet.destroy();
};

// Función para eliminar la imagen de S3
const deleteImageFromS3 = async (imageUrl) => {
  try {
    // Comprobamos si la URL tiene el formato correcto
    if (!imageUrl || !imageUrl.includes(process.env.S3_BUCKET_NAME)) {
      throw new Error('URL de la imagen no válida');
    }

    // Extraemos el nombre del archivo desde la URL
    const fileName = imageUrl.split('/').pop();
    const deleteUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/pet_profile/${fileName}`;

    // Hacemos la solicitud DELETE a S3 para eliminar el archivo
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

module.exports = { deletePetById };
