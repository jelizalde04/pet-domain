const express = require("express");
const router = express.Router();
const { getAllPets } = require("../controllers/PetController");
const authenticateToken = require("../middlewares/auth");

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtener todas las mascotas del usuario autenticado
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de mascotas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Identificador único de la mascota
 *                   name:
 *                     type: string
 *                     description: Nombre de la mascota
 *                   species:
 *                     type: string
 *                     description: Especie de la mascota
 *                   breed:
 *                     type: string
 *                     description: Raza de la mascota
 *                   image:
 *                     type: string
 *                     description: URL de la imagen de la mascota
 *                   birthdate:
 *                     type: string
 *                     format: date
 *                     description: Fecha de nacimiento
 *                   responsibleId:
 *                     type: string
 *                     description: ID del responsable
 *       404:
 *         description: No se encontraron mascotas
 *       500:
 *         description: Error interno del servidor
 */
router.get("/pets", authenticateToken, getAllPets);

module.exports = router;
