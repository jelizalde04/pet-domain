const express = require("express");
const router = express.Router();
const { createPetProfile } = require("../controllers/PetController");
const authenticateToken = require("../middlewares/auth"); 

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Crea un nuevo perfil de mascota
 *     description: Crea un nuevo perfil de mascota en el sistema para un usuario autenticado.
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
 *         description: Perfil de mascota creado exitosamente.
 *       400:
 *         description: Datos de entrada no válidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               nombreFaltante:
 *                 summary: Falta el nombre
 *                 value:
 *                   error: El nombre de la mascota es obligatorio.
 *               mascotaDuplicada:
 *                 summary: Mascota ya existe
 *                 value:
 *                   error: Ya tienes una mascota con este nombre.
 *               responsableInvalido:
 *                 summary: Usuario no válido
 *                 value:
 *                   error: ID del responsable no válido.
 *       403:
 *         description: Acción no autorizada (token no válido o ausente).
 *       500:
 *         description: Error interno del servidor.
 */

router.post("/", authenticateToken, createPetProfile); 

module.exports = router;
