const express = require("express");
const router = express.Router();
const { createPetProfile } = require("../controllers/PetController");
const authenticateToken = require("../middlewares/auth");
const multer = require('multer');  

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image'); 

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
 *         multipart/form-data:
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
 *                 format: binary
 *                 description: Imagen de la mascota
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
 *       403:
 *         description: Acción no autorizada (token no válido o ausente).
 *       500:
 *         description: Error interno del servidor.
 */

router.post("/", authenticateToken, upload, createPetProfile); // Agregamos el middleware de multer

module.exports = router;
