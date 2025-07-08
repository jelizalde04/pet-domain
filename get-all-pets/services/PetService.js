const Pet = require("../models/Pet");
const Responsible = require("../models/Responsible");

/**
 * Recupera todas las mascotas de la base de datos con sus responsables.
 * NO filtra por usuario.
 */
const getAllPetsFromDB = async () => {
  try {
    const pets = await Pet.findAll();

    const petsWithResponsibles = await Promise.all(
      pets.map(async (pet) => {
        const responsible = await Responsible.findOne({
          where: { id: pet.responsibleId },
        });

        if (!responsible) {
          const error = new Error("Responsable no encontrado.");
          error.status = 404;
          throw error;
        }

        return {
          ...pet.dataValues,
          responsible: responsible.dataValues,
        };
      })
    );

    return petsWithResponsibles;
  } catch (error) {
    throw error;
  }
};

/**
 * Recupera todas las mascotas de un usuario específico.
 * @param {string} userId
 */
const getAllUserPets = async (userId) => {
  if (!userId) {
    const error = new Error("ID del usuario es obligatorio.");
    error.status = 400;
    throw error;
  }

  const pets = await Pet.findAll({
    where: { responsibleId: userId },
  });

  const petsWithResponsibles = await Promise.all(
    pets.map(async (pet) => {
      const responsible = await Responsible.findOne({
        where: { id: pet.responsibleId },
      });

      if (!responsible) {
        const error = new Error("Responsable no encontrado.");
        error.status = 404;
        throw error;
      }

      return {
        ...pet.dataValues,
        responsible: responsible.dataValues,
      };
    })
  );

  return petsWithResponsibles;
};

module.exports = { getAllUserPets, getAllPetsFromDB };
