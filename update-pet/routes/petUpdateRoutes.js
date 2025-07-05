const express = require("express");
const router = express.Router();
const { updatePet, updatePetImage } = require("../controllers/PetUpdateController");
const authenticateToken = require("../middlewares/auth");
const multer = require("multer");

// Configurar Multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image'); // 'image' es el nombre del campo en el formulario

/**
 * @swagger
 * /pets/update/{id}:
 *   patch:
 *     summary: Actualizar información de una mascota
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la mascota a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               breed:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Mascota actualizada exitosamente
 *       400:
 *         description: Error de validación, campos incorrectos o nombre duplicado
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No tienes permiso para actualizar esta mascota
 *       404:
 *         description: Mascota no encontrada
 */
router.patch("/:id", authenticateToken, updatePet);

/**
 * @swagger
 /pets/update/image/{id}:
  put:
    summary: Actualizar la imagen de una mascota
    tags: [Pets]
    security:
      - bearerAuth: []
    parameters:
      - in: path
        name: id
        required: true
        schema:
          type: string
          format: uuid
        description: ID de la mascota a actualizar
    requestBody:
      required: true
      content:
        multipart/form-data:
          schema:
            type: object
            properties:
              image:
                type: string
                format: binary
    responses:
      200:
        description: Imagen de la mascota actualizada exitosamente
      403:
        description: No tienes permiso para actualizar la imagen de esta mascota
      404:
        description: Mascota no encontrada
      500:
        description: Error al actualizar la imagen
 */
router.put("/image/:id", authenticateToken, upload, updatePetImage); // Ruta para actualizar solo la imagen de la mascota

module.exports = router;
