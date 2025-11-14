// Routes Express pour les artisans.
// Chaque route délègue la logique au controller correspondant.

const express = require("express");
const router = express.Router();
const artisanController = require("../controllers/artisanController");

/**
 * @route GET /api/artisans/mois
 * @description Récupère les 3 artisans du mois
 * @returns {Array<Object>} Liste des artisans du mois
 */
router.get("/mois", artisanController.getArtisansDuMois);

/**
 * @route GET /api/artisans/search
 * @description Recherche des artisans par nom (query string ?q=)
 * @returns {Array<Object>} Liste des artisans correspondant à la recherche
 */
router.get("/search", artisanController.searchArtisans);

/**
 * @route GET /api/artisans/categorie/:nom
 * @description Récupère les artisans d'une catégorie donnée
 * @param {string} nom - Nom de la catégorie
 * @returns {Array<Object>} Liste des artisans de la catégorie
 */
router.get("/categorie/:nom", artisanController.getArtisansByCategorie);

/**
 * @route GET /api/artisans
 * @description Récupère tous les artisans
 * @returns {Array<Object>} Liste de tous les artisans
 */
router.get("/", artisanController.getAllArtisans);

/**
 * @route GET /api/artisans/:id
 * @description Récupère un artisan par ID
 * @param {number} id - ID de l'artisan
 * @returns {Object} Artisan correspondant
 */
router.get("/:id", artisanController.getArtisanById);

/**
 * @route POST /api/artisans
 * @description Crée un nouvel artisan
 * @param {Object} body - Données de l'artisan
 * @returns {Object} Artisan créé
 */
router.post("/", artisanController.createArtisan);

/**
 * @route PUT /api/artisans/:id
 * @description Met à jour un artisan existant
 * @param {number} id - ID de l'artisan
 * @param {Object} body - Données à mettre à jour
 * @returns {Object} Artisan mis à jour
 */
router.put("/:id", artisanController.updateArtisan);

/**
 * @route DELETE /api/artisans/:id
 * @description Supprime un artisan
 * @param {number} id - ID de l'artisan à supprimer
 * @returns {Object} Message de confirmation
 */
router.delete("/:id", artisanController.deleteArtisan);

module.exports = router;
