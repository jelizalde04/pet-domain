const express = require("express");
const router = express.Router();
const { updatePet } = require("../controllers/PetUpdateController");
const authenticateToken = require("../middlewares/auth");

/**
 * @swagger
 * /pets/{id}:
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
 *               image:
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

module.exports = router;
