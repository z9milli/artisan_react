const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');

// Routes CRUD
// Route pour les artisans du mois (AVANT la route /:id pour éviter les conflits)
router.get('/mois', artisanController.getArtisansDuMois);

// Route pour la recherche
router.get('/search', artisanController.searchArtisans);

// Route pour récupérer les artisans par catégorie
router.get('/categorie/:nom', artisanController.getArtisansByCategorie);

router.get('/', artisanController.getAllArtisans);
router.get('/:id', artisanController.getArtisanById);
router.post('/', artisanController.createArtisan);
router.put('/:id', artisanController.updateArtisan);
router.delete('/:id', artisanController.deleteArtisan);

module.exports = router;
