// Controller gérant les requêtes HTTP liées aux artisans.

const artisanService = require("../services/artisanService");

/**
 * Récupère tous les artisans.
 * @async
 * @function getAllArtisans
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} Renvoie un JSON avec tous les artisans et statut 200, ou 500 en cas d'erreur serveur
 */
exports.getAllArtisans = async (req, res) => {
  try {
    const artisans = await artisanService.fetchAllArtisans();
    res.status(200).json(artisans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Récupère les 3 artisans du mois.
 * @async
 * @function getArtisansDuMois
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} Renvoie un JSON avec les artisans du mois et statut 200, ou 500 en cas d'erreur serveur
 */
exports.getArtisansDuMois = async (req, res) => {
  try {
    const artisans = await artisanService.fetchArtisansDuMois();
    res.status(200).json(artisans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Récupère les artisans par catégorie.
 * @async
 * @function getArtisansByCategorie
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} JSON avec les artisans de la catégorie (200), 404 si catégorie non trouvée, 500 en cas d'erreur serveur
 */
exports.getArtisansByCategorie = async (req, res) => {
  try {
    const categorieNom = req.params.nom;
    const artisans = await artisanService.fetchArtisansByCategorie(
      categorieNom
    );

    if (!artisans) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    res.status(200).json(artisans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Recherche des artisans par nom.
 * @async
 * @function searchArtisans
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} JSON avec les artisans correspondant à la recherche (200), 400 si paramètre manquant, 500 pour erreur serveur
 */
exports.searchArtisans = async (req, res) => {
  try {
    const query = req.query.q;
    const artisans = await artisanService.searchArtisans(query);

    res.status(200).json(artisans);
  } catch (error) {
    if (error.message === "Paramètre de recherche manquant") {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Récupère un artisan par ID.
 * @async
 * @function getArtisanById
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} JSON avec l'artisan (200), 404 si non trouvé, 500 en cas d'erreur serveur
 */
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

/**
 * Crée un nouvel artisan.
 * @async
 * @function createArtisan
 * @param {Object} req - Objet requête Express (body contient les données de l'artisan)
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} JSON avec l'artisan créé (201), ou 500 en cas d'erreur serveur
 */
exports.createArtisan = async (req, res) => {
  try {
    const newArtisan = await artisanService.createArtisan(req.body);
    res.status(201).json(newArtisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de créer l'artisan" });
  }
};

/**
 * Met à jour un artisan existant.
 * @async
 * @function updateArtisan
 * @param {Object} req - Objet requête Express (params.id = ID de l'artisan, body = nouvelles données)
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} JSON avec l'artisan mis à jour (200), 404 si non trouvé, 500 en cas d'erreur serveur
 */
exports.updateArtisan = async (req, res) => {
  try {
    const updatedArtisan = await artisanService.updateArtisan(
      req.params.id,
      req.body
    );

    if (!updatedArtisan) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }

    res.status(200).json(updatedArtisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de mettre à jour l'artisan" });
  }
};

/**
 * Supprime un artisan.
 * @async
 * @function deleteArtisan
 * @param {Object} req - Objet requête Express (params.id = ID de l'artisan)
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} Message de succès (200), 404 si non trouvé, 500 en cas d'erreur serveur
 */
exports.deleteArtisan = async (req, res) => {
  try {
    const deleted = await artisanService.deleteArtisan(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }

    res.status(200).json({ message: "Artisan supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de supprimer l'artisan" });
  }
};
