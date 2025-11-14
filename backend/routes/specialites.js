// Routes Express pour les spécialités.
// Chaque route délègue la logique au controller correspondant.

const express = require("express");
const router = express.Router();
const specialiteController = require("../controllers/specialiteController");

/**
 * @route GET /api/specialites
 * @description Récupère toutes les spécialités avec leur catégorie
 * @returns {Array<Object>} Liste de toutes les spécialités
 */
router.get("/", specialiteController.getAllSpecialites);

/**
 * @route GET /api/specialites/:id
 * @description Récupère une spécialité par son ID avec sa catégorie
 * @param {number} id - ID de la spécialité
 * @returns {Object} Spécialité correspondant à l'ID
 */
router.get("/:id", specialiteController.getSpecialiteById);

/**
 * @route POST /api/specialites
 * @description Crée une nouvelle spécialité
 * @param {Object} body - Données de la spécialité
 * @returns {Object} Spécialité créée
 */
router.post("/", specialiteController.createSpecialite);

/**
 * @route PUT /api/specialites/:id
 * @description Met à jour une spécialité existante
 * @param {number} id - ID de la spécialité à mettre à jour
 * @param {Object} body - Données à mettre à jour
 * @returns {Object} Spécialité mise à jour
 */
router.put("/:id", specialiteController.updateSpecialite);

/**
 * @route DELETE /api/specialites/:id
 * @description Supprime une spécialité
 * @param {number} id - ID de la spécialité à supprimer
 * @returns {Object} Message de confirmation
 */
router.delete("/:id", specialiteController.deleteSpecialite);

module.exports = router;
