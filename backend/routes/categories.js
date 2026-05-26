// Routes Express liées aux catégories.
// Chaque route délègue le traitement au controller correspondant.

const express = require("express");
const router = express.Router();
const categorieController = require("../controllers/categorieController");

/**
 * @route GET /api/categories
 * @description Récupère toutes les catégories
 */
router.get("/", categorieController.getAllCategories);

/**
 * @route GET /api/categories/:id
 * @description Récupère une catégorie grâce à son ID
 */
router.get("/:id", categorieController.getCategorieById);

/**
 * @route POST /api/categories
 * @description Crée une nouvelle catégorie
 */
router.post("/", categorieController.createCategorie);

/**
 * @route PUT /api/categories/:id
 * @description Met à jour une catégorie existante
 */
router.put("/:id", categorieController.updateCategorie);

/**
 * @route DELETE /api/categories/:id
 * @description Supprime une catégorie
 */
router.delete("/:id", categorieController.deleteCategorie);

module.exports = router;
