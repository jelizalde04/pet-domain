const express = require("express");
const router = express.Router();
const {
  getAllPets,
  getAllPetsFromDatabase,
} = require("../controllers/PetController");
const authenticateToken = require("../middlewares/auth");

/**
 * @swagger
 * /pets/getAll:
 *   get:
 *     summary: Obtener todas las mascotas del usuario autenticado, incluyendo información del responsable
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de mascotas del usuario con la información del responsable
 *       404:
 *         description: No se encontraron mascotas
 *       500:
 *         description: Error interno del servidor
 */
router.get("/getAll", authenticateToken, getAllPets);

/**
 * @swagger
 * /pets/all:
 *   get:
 *     summary: Obtener todas las mascotas existentes, incluyendo información del responsable
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de todas las mascotas con la información de sus responsables
 *       404:
 *         description: No se encontraron mascotas
 *       500:
 *         description: Error interno del servidor
 */
router.get("/all", getAllPetsFromDatabase);

module.exports = router;
