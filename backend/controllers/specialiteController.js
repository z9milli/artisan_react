// src/controllers/specialiteController.js (Mis à jour)

const specialiteService = require('../services/specialiteService'); // 👈 Import du service

// Suppression des imports de modèles (db, Specialite, Categorie) qui ne sont plus nécessaires ici.

// Récupérer toutes les spécialités avec leur catégorie
exports.getAllSpecialites = async (req, res) => {
  try {
    // Délégation totale au Service
    const specialites = await specialiteService.fetchAllSpecialites();
    res.status(200).json(specialites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer une spécialité par ID avec sa catégorie
exports.getSpecialiteById = async (req, res) => {
  try {
    const specialite = await specialiteService.fetchSpecialiteById(req.params.id);

    if (!specialite) {
      return res.status(404).json({ message: "Spécialité non trouvée" });
    }

    res.status(200).json(specialite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Créer une spécialité
exports.createSpecialite = async (req, res) => {
  try {
    const newSpecialite = await specialiteService.createSpecialite(req.body);
    res.status(201).json(newSpecialite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de créer la spécialité" });
  }
};

// Mettre à jour une spécialité
exports.updateSpecialite = async (req, res) => {
  try {
    const updatedSpecialite = await specialiteService.updateSpecialite(req.params.id, req.body);
    
    if (!updatedSpecialite) 
        return res.status(404).json({ message: "Spécialité non trouvée" });

    res.status(200).json(updatedSpecialite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de mettre à jour la spécialité" });
  }
};

// Supprimer une spécialité
exports.deleteSpecialite = async (req, res) => {
  try {
    const deleted = await specialiteService.deleteSpecialite(req.params.id);
    
    if (!deleted) 
        return res.status(404).json({ message: "Spécialité non trouvée" });

    res.status(200).json({ message: "Spécialité supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de supprimer la spécialité" });
  }
};