// src/services/categorieService.js

const db = require("../models");
const Categorie = db.Categorie;

// --- Logique Service (CRUD) ---

// Récupérer toutes les catégories
exports.fetchAllCategories = async () => {
    // Le Service appelle directement le Model pour l'accès DB
    return await Categorie.findAll();
};

// Récupérer une catégorie par ID
exports.fetchCategorieById = async (id) => {
    return await Categorie.findByPk(id);
};

// Créer une catégorie
exports.createCategorie = async (data) => {
    // Logique métier : (ex: validation avant la création)
    // if (!data.nom) throw new Error("Le nom est obligatoire"); 

    return await Categorie.create(data);
};

// Mettre à jour une catégorie
exports.updateCategorie = async (id, data) => {
    // 1. Mise à jour de la DB
    const [updated] = await Categorie.update(data, { 
        where: { id_categorie: id } 
    });
    
    // Si la mise à jour n'a affecté aucune ligne (catégorie non trouvée)
    if (!updated) return null; 

    // 2. Récupérer la version mise à jour
    return await Categorie.findByPk(id);
};

// Supprimer une catégorie
exports.deleteCategorie = async (id) => {
    // 1. Suppression de la DB
    const deleted = await Categorie.destroy({ 
        where: { id_categorie: id } 
    });

    // 2. Le Service traduit le résultat en booléen facile à gérer pour le Contrôleur
    return deleted > 0;
};