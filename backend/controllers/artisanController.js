// artisanController.js (Mis à jour)

const artisanService = require('../services/artisanService'); // 👈 Import de la couche Service

// Suppression des imports de modèles (Artisan, Specialite, Categorie) qui ne sont plus nécessaires ici.

// Récupérer tous les artisans
exports.getAllArtisans = async (req, res) => {
  try {
    // Délégation totale au Service
    const artisans = await artisanService.fetchAllArtisans();
    res.status(200).json(artisans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer les 3 artisans du mois
exports.getArtisansDuMois = async (req, res) => {
  try {
    // Délégation totale au Service
    const artisans = await artisanService.fetchArtisansDuMois();
    res.status(200).json(artisans); // Statut 200 par défaut
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer les artisans par catégorie (par nom de catégorie)
exports.getArtisansByCategorie = async (req, res) => {
  try {
    const categorieNom = req.params.nom;
    const artisans = await artisanService.fetchArtisansByCategorie(categorieNom);
    
    // Le Controller gère le 404
    if (!artisans) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    
    res.status(200).json(artisans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Rechercher des artisans par nom
exports.searchArtisans = async (req, res) => {
  try {
    const query = req.query.q;
    
    // La validation du paramètre est maintenant gérée par le Service, 
    // mais le Controller doit capturer l'erreur s'il manque.
    const artisans = await artisanService.searchArtisans(query);

    res.status(200).json(artisans);
  } catch (error) {
    // Si le service renvoie une erreur "Paramètre manquant", on peut la traiter ici.
    if (error.message === "Paramètre de recherche manquant") {
        return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer un artisan par ID
exports.getArtisanById = async (req, res) => {
  try {
    const artisan = await artisanService.fetchArtisanById(req.params.id);
    
    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }
    res.status(200).json(artisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Créer un artisan
exports.createArtisan = async (req, res) => {
  try {
    const newArtisan = await artisanService.createArtisan(req.body);
    res.status(201).json(newArtisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de créer l'artisan" });
  }
};

// Mettre à jour un artisan
exports.updateArtisan = async (req, res) => {
  try {
    const updatedArtisan = await artisanService.updateArtisan(req.params.id, req.body);
    
    if (!updatedArtisan)
      return res.status(404).json({ message: "Artisan non trouvé" });
      
    res.status(200).json(updatedArtisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de mettre à jour l'artisan" });
  }
};

// Supprimer un artisan
exports.deleteArtisan = async (req, res) => {
  try {
    const deleted = await artisanService.deleteArtisan(req.params.id);
    
    if (!deleted)
      return res.status(404).json({ message: "Artisan non trouvé" });
      
    res.status(200).json({ message: "Artisan supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de supprimer l'artisan" });
  }
};