const express = require("express");
const router = express.Router();
const { getAllPets } = require("../controllers/PetController");
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
 *                   responsible:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID del responsable
 *                       name:
 *                         type: string
 *                         description: Nombre del responsable
 *                       email:
 *                         type: string
 *                         description: Correo electrónico del responsable
 *                       contact:
 *                         type: string
 *                         description: Número de contacto del responsable
 *                       avatar:
 *                         type: string
 *                         description: URL del avatar del responsable
 *       404:
 *         description: No se encontraron mascotas
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", authenticateToken, getAllPets);

module.exports = router;
