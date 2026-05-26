// Routes Express liées aux artisans.
// Chaque route délègue le traitement au controller correspondant.

const express = require("express");
const router = express.Router();
const artisanController = require("../controllers/artisanController");

/**
 * @route GET /api/artisans/mois
 * @description Récupère les 3 artisans du mois
 */
router.get("/mois", artisanController.getArtisansDuMois);

/**
 * @route GET /api/artisans/search
 * @description Recherche des artisans par nom, ville ou spécialité
 */
router.get("/search", artisanController.searchArtisans);

/**
 * @route GET /api/artisans/categorie/:nom
 * @description Récupère les artisans d'une catégorie
 */
router.get("/categorie/:nom", artisanController.getArtisansByCategorie);

/**
 * @route GET /api/artisans
 * @description Récupère tous les artisans
 */
router.get("/", artisanController.getAllArtisans);

/**
 * @route GET /api/artisans/:id
 * @description Récupère un artisan grâce à son ID
 */
router.get("/:id", artisanController.getArtisanById);

/**
 * @route POST /api/artisans
 * @description Crée un nouvel artisan
 */
router.post("/", artisanController.createArtisan);

/**
 * @route PUT /api/artisans/:id
 * @description Met à jour un artisan existant
 */
router.put("/:id", artisanController.updateArtisan);

/**
 * @route DELETE /api/artisans/:id
 * @description Supprime un artisan
 */
router.delete("/:id", artisanController.deleteArtisan);

module.exports = router;
