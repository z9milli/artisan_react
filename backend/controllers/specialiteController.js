// Controller gérant les requêtes HTTP liées aux spécialités.

const specialiteService = require("../services/specialiteService");

/**
 * Récupère toutes les spécialités avec leur catégorie.
 * @async
 * @function getAllSpecialites
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} JSON avec toutes les spécialités (200) ou 500 en cas d'erreur serveur
 */
exports.getAllSpecialites = async (req, res) => {
  try {
    const specialites = await specialiteService.fetchAllSpecialites();
    res.status(200).json(specialites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Récupère une spécialité par ID avec sa catégorie.
 * @async
 * @function getSpecialiteById
 * @param {Object} req - Objet requête Express (params.id = ID de la spécialité)
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} JSON avec la spécialité (200), 404 si non trouvée, 500 en cas d'erreur serveur
 */
exports.getSpecialiteById = async (req, res) => {
  try {
    const specialite = await specialiteService.fetchSpecialiteById(
      req.params.id
    );

    if (!specialite) {
      return res.status(404).json({ message: "Spécialité non trouvée" });
    }

    res.status(200).json(specialite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Crée une nouvelle spécialité.
 * @async
 * @function createSpecialite
 * @param {Object} req - Objet requête Express (body = données de la spécialité)
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} JSON avec la spécialité créée (201), ou 500 en cas d'erreur serveur
 */
exports.createSpecialite = async (req, res) => {
  try {
    const newSpecialite = await specialiteService.createSpecialite(req.body);
    res.status(201).json(newSpecialite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de créer la spécialité" });
  }
};

/**
 * Met à jour une spécialité existante.
 * @async
 * @function updateSpecialite
 * @param {Object} req - Objet requête Express (params.id = ID, body = nouvelles données)
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} JSON avec la spécialité mise à jour (200), 404 si non trouvée, 500 en cas d'erreur serveur
 */
exports.updateSpecialite = async (req, res) => {
  try {
    const updatedSpecialite = await specialiteService.updateSpecialite(
      req.params.id,
      req.body
    );

    if (!updatedSpecialite)
      return res.status(404).json({ message: "Spécialité non trouvée" });

    res.status(200).json(updatedSpecialite);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Impossible de mettre à jour la spécialité" });
  }
};

/**
 * Supprime une spécialité.
 * @async
 * @function deleteSpecialite
 * @param {Object} req - Objet requête Express (params.id = ID de la spécialité)
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} Message de succès (200), 404 si non trouvée, 500 en cas d'erreur serveur
 */
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
