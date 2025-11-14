// Routes Express pour les catégories.
// Chaque route délègue la logique au controller correspondant.

const express = require("express");
const router = express.Router();
const categorieController = require("../controllers/categorieController");

/**
 * @route GET /api/categories
 * @description Récupère toutes les catégories
 * @returns {Array<Object>} Liste de toutes les catégories
 */
router.get("/", categorieController.getAllCategories);

/**
 * @route GET /api/categories/:id
 * @description Récupère une catégorie par son ID
 * @param {number} id - ID de la catégorie
 * @returns {Object} Catégorie correspondant à l'ID
 */
router.get("/:id", categorieController.getCategorieById);

/**
 * @route POST /api/categories
 * @description Crée une nouvelle catégorie
 * @param {Object} body - Données de la catégorie
 * @returns {Object} Catégorie créée
 */
router.post("/", categorieController.createCategorie);

/**
 * @route PUT /api/categories/:id
 * @description Met à jour une catégorie existante
 * @param {number} id - ID de la catégorie à mettre à jour
 * @param {Object} body - Données à mettre à jour
 * @returns {Object} Catégorie mise à jour
 */
router.put("/:id", categorieController.updateCategorie);

/**
 * @route DELETE /api/categories/:id
 * @description Supprime une catégorie
 * @param {number} id - ID de la catégorie à supprimer
 * @returns {Object} Message de confirmation
 */
router.delete("/:id", categorieController.deleteCategorie);

module.exports = router;
