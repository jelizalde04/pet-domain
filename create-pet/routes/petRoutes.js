const express = require("express");
const router = express.Router();
const { createPetProfile } = require("../controllers/PetController");
const authenticateToken = require("../middlewares/auth"); // Importa el middleware de autenticación

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Create a new pet profile
 *     description: Crea un nuevo perfil de mascota en el sistema.
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - species
 *               - breed
 *               - image
 *               - birthdate
 *               - residence
 *               - gender
 *               - color
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la mascota
 *               species:
 *                 type: string
 *                 description: Especie de la mascota
 *               breed:
 *                 type: string
 *                 description: Raza de la mascota
 *               image:
 *                 type: string
 *                 description: URL de la imagen de la mascota
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento de la mascota
 *               residence:
 *                 type: string
 *                 description: Tipo de residencia de la mascota
 *               gender:
 *                 type: string
 *                 description: Género de la mascota
 *               color:
 *                 type: string
 *                 description: Color de la mascota
 *     responses:
 *       201:
 *         description: Pet profile created successfully.
 *       400:
 *         description: Invalid input data.
 *       403:
 *         description: Unauthorized action
 *       500:
 *         description: Internal Server Error.
 */
router.post("/pets", authenticateToken, createPetProfile); // Protegemos esta ruta con JWT

module.exports = router;
