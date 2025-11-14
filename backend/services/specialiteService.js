// src/services/specialiteService.js

const db = require("../models");
const Specialite = db.Specialite;
const Categorie = db.Categorie;

// Fonction de combinaison réutilisable (Logique Métier)
const attachCategorieToSpecialites = async (specialites) => {
    return await Promise.all(
        specialites.map(async (spec) => {
            // Récupère les données brutes de la catégorie
            const categorie = await Categorie.findByPk(spec.id_categorie);
            
            // Logique de combinaison
            return { ...spec.toJSON(), categorie };
        })
    );
};

// --- Logique Service (CRUD + Logique Métier) ---

// Récupérer toutes les spécialités avec leur catégorie
exports.fetchAllSpecialites = async () => {
    const specialites = await Specialite.findAll();
    
    // Logique métier : Ajout de la catégorie
    return attachCategorieToSpecialites(specialites);
};

// Récupérer une spécialité par ID avec sa catégorie
exports.fetchSpecialiteById = async (id) => {
    const specialite = await Specialite.findByPk(id);

    if (!specialite) {
      return null;
    }
    
    // Logique métier : Ajout de la catégorie
    const categorie = await Categorie.findByPk(specialite.id_categorie);
    return { ...specialite.toJSON(), categorie };
};

// Créer une spécialité
exports.createSpecialite = async (data) => {
    // Logique métier : (ex: validation de l'id_categorie)
    return await Specialite.create(data);
};

// Mettre à jour une spécialité
exports.updateSpecialite = async (id, data) => {
    const [updated] = await Specialite.update(data, { where: { id_specialite: id } });
    
    if (!updated) return null; 

    return await Specialite.findByPk(id);
};

// Supprimer une spécialité
exports.deleteSpecialite = async (id) => {
    const deleted = await Specialite.destroy({ where: { id_specialite: id } });
    return deleted > 0;
};