const express = require('express');
const router = express.Router();
const specialiteController = require('../controllers/specialiteController');

// Routes CRUD
router.get('/', specialiteController.getAllSpecialites);
router.get('/:id', specialiteController.getSpecialiteById);
router.post('/', specialiteController.createSpecialite);
router.put('/:id', specialiteController.updateSpecialite);
router.delete('/:id', specialiteController.deleteSpecialite);

module.exports = router;
