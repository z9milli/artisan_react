// src/services/artisanService.js

const db = require("../models");
const Artisan = db.Artisan;
const Specialite = db.Specialite;
const Categorie = db.Categorie;

// Fonction de combinaison réutilisable (Logique Métier)
// Note: Idéalement, cette jointure serait gérée par Sequelize 'include' dans le Model.
// Puisque vos Models semblent gérer des appels simples (findAll, findByPk), 
// nous mettons la logique de jointure manuelle dans le Service.
const attachSpecialiteToArtisans = async (artisans) => {
    return await Promise.all(
        artisans.map(async (artisan) => {
            // Récupère les données brutes (délégation au Model/Sequelize)
            const specialite = await Specialite.findByPk(artisan.id_specialite);
            
            // Logique de combinaison (Logique Métier)
            return { ...artisan.toJSON(), specialite };
        })
    );
};

// Logique Service : Récupérer tous les artisans
exports.fetchAllArtisans = async () => {
    const artisans = await Artisan.findAll();
    return attachSpecialiteToArtisans(artisans);
};

// Logique Service : Récupérer les 3 artisans du mois
exports.fetchArtisansDuMois = async () => {
    const artisans = await Artisan.findAll({
      where: { top: true }, // Logique de filtrage (peut rester ici ou aller dans un Model.findTop())
      limit: 3,
    });
    return attachSpecialiteToArtisans(artisans);
};

// Logique Service : Récupérer les artisans par catégorie (Logique Complexe)
exports.fetchArtisansByCategorie = async (categorieNom) => {
    // 1. Trouver la catégorie (délégation au Model)
    const categorie = await Categorie.findOne({
      where: { nom_categorie: categorieNom }
    });
    
    // Logique métier : Gestion de la non-existence de la ressource
    if (!categorie) {
      return null; // Retourne null, le Controller gérera le 404
    }
    
    // 2. Trouver toutes les spécialités de cette catégorie (délégation au Model)
    const specialites = await Specialite.findAll({
      where: { id_categorie: categorie.id_categorie }
    });
    
    // 3. Récupérer les IDs des spécialités (Logique Métier)
    const specialiteIds = specialites.map(s => s.id_specialite);
    
    // 4. Trouver tous les artisans ayant ces spécialités (délégation au Model)
    const artisans = await Artisan.findAll({
      where: { id_specialite: specialiteIds }
    });
    
    // 5. Ajouter les spécialités aux artisans (Logique Métier)
    return attachSpecialiteToArtisans(artisans);
};

// Logique Service : Rechercher des artisans par nom
exports.searchArtisans = async (query) => {
    // 1. Logique métier : Validation de la requête
    if (!query) {
      throw new Error("Paramètre de recherche manquant"); 
    }
    
    // 2. Trouver les artisans (délégation au Model)
    const artisans = await Artisan.findAll({
      where: {
        nom: {
          [db.Sequelize.Op.like]: `%${query}%`
        }
      }
    });
    
    // 3. Ajouter la spécialité
    return attachSpecialiteToArtisans(artisans);
};

// Logique Service : Récupérer un artisan par ID
exports.fetchArtisanById = async (id) => {
    const artisan = await Artisan.findByPk(id);
    
    if (!artisan) {
        return null;
    }
    
    const specialite = await Specialite.findByPk(artisan.id_specialite);
    return { ...artisan.toJSON(), specialite };
};

// Logique Service : Création d'un artisan
exports.createArtisan = async (data) => {
    // Logique métier: Validation des données avant création (ex: valider email, unicité...)
    // if (!isValidEmail(data.email)) throw new Error("Email invalide");
    
    return await Artisan.create(data);
};

// Logique Service : Mise à jour d'un artisan
exports.updateArtisan = async (id, data) => {
    // Logique métier: Vérification des permissions, validation des champs...
    
    const [updated] = await Artisan.update(data, {
      where: { id_artisan: id },
    });
    
    if (!updated) return null; // Artisan non trouvé
    
    return await Artisan.findByPk(id);
};

// Logique Service : Suppression d'un artisan
exports.deleteArtisan = async (id) => {
    // Logique métier: Vérification des dépendances avant suppression...
    
    const deleted = await Artisan.destroy({ where: { id_artisan: id } });
    return deleted > 0; // Renvoie true/false
};