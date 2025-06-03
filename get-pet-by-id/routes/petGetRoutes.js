const express = require("express");
const router = express.Router();
const { getPetById } = require("../controllers/PetGetController");
const authenticateToken = require("../middlewares/auth"); // si quieres controlar acceso

/**
 * @swagger
 * tags:
 *   name: Consulta de Mascotas
 *   description: Endpoints para obtener información de mascotas
 */

/**
 * @swagger
 * /api/pets/{id}:
 *   get:
 *     summary: Obtiene una mascota por su ID
 *     tags: [Consulta de Mascotas]
 *     security:
 *       - bearerAuth: []    # si quieres que sea privado
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota a obtener
 *     responses:
 *       200:
 *         description: Datos de la mascota
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Mascota no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Si quieres proteger la ruta con autenticación:
router.get("/pets/:id", authenticateToken, getPetById);

// Si quieres que sea pública, usa solo:
// router.get("/pets/:id", getPetById);

module.exports = router;
