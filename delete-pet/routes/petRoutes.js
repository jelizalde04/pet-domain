const express = require("express");
const router = express.Router();
const { deletePet } = require("../controllers/PetController");
const authenticateToken = require("../middlewares/auth"); 

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Endpoints para gestionar las mascotas
 */

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Elimina un perfil de mascota
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []  # Si quieres que la ruta requiera autenticación
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la mascota a eliminar
 *     responses:
 *       200:
 *         description: Mascota eliminada correctamente
 *       400:
 *         description: ID no válido
 *       403:
 *         description: No tienes permiso para eliminar esta mascota
 *       404:
 *         description: Mascota no encontrada
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", authenticateToken, deletePet);

module.exports = router;
