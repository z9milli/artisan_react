const db = require("../models");
const Artisan = db.Artisan;
const Specialite = db.Specialite;
const Categorie = db.Categorie;

// Récupérer tous les artisans avec leur spécialité
exports.getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll();
    // On récupère la spécialité pour chaque artisan
    const artisansWithSpecialite = await Promise.all(
      artisans.map(async (artisan) => {
        const specialite = await Specialite.findByPk(artisan.id_specialite);
        return { ...artisan.toJSON(), specialite };
      })
    );
    res.status(200).json(artisansWithSpecialite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer les 3 artisans du mois
exports.getArtisansDuMois = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top: true },
      limit: 3,
    });
    
    // Ajouter la spécialité pour chaque artisan
    const artisansWithSpecialite = await Promise.all(
      artisans.map(async (artisan) => {
        const specialite = await Specialite.findByPk(artisan.id_specialite);
        return { ...artisan.toJSON(), specialite };
      })
    );
    
    res.json(artisansWithSpecialite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer les artisans par catégorie (par nom de catégorie)
exports.getArtisansByCategorie = async (req, res) => {
  try {
    const categorieNom = req.params.nom;
    
    // 1. Trouver la catégorie par son nom
    const categorie = await Categorie.findOne({
      where: { nom_categorie: categorieNom }
    });
    
    if (!categorie) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    
    // 2. Trouver toutes les spécialités de cette catégorie
    const specialites = await Specialite.findAll({
      where: { id_categorie: categorie.id_categorie }
    });
    
    // 3. Récupérer les IDs des spécialités
    const specialiteIds = specialites.map(s => s.id_specialite);
    
    // 4. Trouver tous les artisans ayant ces spécialités
    const artisans = await Artisan.findAll({
      where: { id_specialite: specialiteIds }
    });
    
    // 5. Ajouter les spécialités aux artisans
    const artisansWithSpecialite = await Promise.all(
      artisans.map(async (artisan) => {
        const specialite = await Specialite.findByPk(artisan.id_specialite);
        return { ...artisan.toJSON(), specialite };
      })
    );
    
    res.status(200).json(artisansWithSpecialite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Rechercher des artisans par nom
exports.searchArtisans = async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ message: "Paramètre de recherche manquant" });
    }
    
    const artisans = await Artisan.findAll({
      where: {
        nom: {
          [db.Sequelize.Op.like]: `%${query}%`
        }
      }
    });
    
    // Ajouter la spécialité pour chaque artisan
    const artisansWithSpecialite = await Promise.all(
      artisans.map(async (artisan) => {
        const specialite = await Specialite.findByPk(artisan.id_specialite);
        return { ...artisan.toJSON(), specialite };
      })
    );
    
    res.status(200).json(artisansWithSpecialite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer un artisan par ID avec sa spécialité
exports.getArtisanById = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }
    const specialite = await Specialite.findByPk(artisan.id_specialite);
    res.status(200).json({ ...artisan.toJSON(), specialite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Créer un artisan
exports.createArtisan = async (req, res) => {
  try {
    const newArtisan = await Artisan.create(req.body);
    res.status(201).json(newArtisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de créer l'artisan" });
  }
};

// Mettre à jour un artisan
exports.updateArtisan = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Artisan.update(req.body, {
      where: { id_artisan: id },
    });
    if (!updated)
      return res.status(404).json({ message: "Artisan non trouvé" });
    const updatedArtisan = await Artisan.findByPk(id);
    res.status(200).json(updatedArtisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de mettre à jour l'artisan" });
  }
};

// Supprimer un artisan
exports.deleteArtisan = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Artisan.destroy({ where: { id_artisan: id } });
    if (!deleted)
      return res.status(404).json({ message: "Artisan non trouvé" });
    res.status(200).json({ message: "Artisan supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de supprimer l'artisan" });
  }
};