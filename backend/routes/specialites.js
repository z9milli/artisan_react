// Routes Express liées aux spécialités.
// Chaque route délègue le traitement au controller correspondant.

const express = require("express");
const router = express.Router();
const specialiteController = require("../controllers/specialiteController");

/**
 * @route GET /api/specialites
 * @description Récupère toutes les spécialités avec leur catégorie
 */
router.get("/", specialiteController.getAllSpecialites);

/**
 * @route GET /api/specialites/:id
 * @description Récupère une spécialité grâce à son ID
 */
router.get("/:id", specialiteController.getSpecialiteById);

/**
 * @route POST /api/specialites
 * @description Crée une nouvelle spécialité
 */
router.post("/", specialiteController.createSpecialite);

/**
 * @route PUT /api/specialites/:id
 * @description Met à jour une spécialité existante
 */
router.put("/:id", specialiteController.updateSpecialite);

/**
 * @route DELETE /api/specialites/:id
 * @description Supprime une spécialité
 */
router.delete("/:id", specialiteController.deleteSpecialite);

module.exports = router;
