const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

// Routes CRUD
router.get('/', categorieController.getAllCategories);
router.get('/:id', categorieController.getCategorieById);
router.post('/', categorieController.createCategorie);
router.put('/:id', categorieController.updateCategorie);
router.delete('/:id', categorieController.deleteCategorie);

module.exports = router;
