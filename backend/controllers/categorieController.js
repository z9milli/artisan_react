// src/controllers/categorieController.js (Mis à jour)

const categorieService = require('../services/categorieService'); // 👈 Import du service

// Suppression des imports de modèles (db et Categorie) qui ne sont plus nécessaires ici.

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categorieService.fetchAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Récupérer une catégorie par ID
exports.getCategorieById = async (req, res) => {
    try {
        const categorie = await categorieService.fetchCategorieById(req.params.id);
        
        // Le Controller gère les codes HTTP 404
        if (!categorie) return res.status(404).json({ message: "Catégorie non trouvée" });
        
        res.status(200).json(categorie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Créer une catégorie
exports.createCategorie = async (req, res) => {
    try {
        const newCategorie = await categorieService.createCategorie(req.body);
        res.status(201).json(newCategorie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Impossible de créer la catégorie" });
    }
};

// Mettre à jour une catégorie
exports.updateCategorie = async (req, res) => {
    try {
        const updatedCategorie = await categorieService.updateCategorie(req.params.id, req.body);

        if (!updatedCategorie) 
            return res.status(404).json({ message: "Catégorie non trouvée" });

        res.status(200).json(updatedCategorie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Impossible de mettre à jour la catégorie" });
    }
};

// Supprimer une catégorie
exports.deleteCategorie = async (req, res) => {
    try {
        const deleted = await categorieService.deleteCategorie(req.params.id);

        if (!deleted) 
            return res.status(404).json({ message: "Catégorie non trouvée" });

        res.status(200).json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Impossible de supprimer la catégorie" });
    }
};