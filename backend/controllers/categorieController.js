// Controller gérant les requêtes HTTP liées aux catégories.

const categorieService = require("../services/categorieService");

/**
 * Récupère toutes les catégories.
 * @async
 * @function getAllCategories
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} JSON avec toutes les catégories (200) ou 500 en cas d'erreur serveur
 */
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categorieService.fetchAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Récupère une catégorie par ID.
 * @async
 * @function getCategorieById
 * @param {Object} req - Objet requête Express (params.id = ID de la catégorie)
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} JSON avec la catégorie (200), 404 si non trouvée, ou 500 en cas d'erreur serveur
 */
exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await categorieService.fetchCategorieById(req.params.id);

    if (!categorie)
      return res.status(404).json({ message: "Catégorie non trouvée" });

    res.status(200).json(categorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Crée une nouvelle catégorie.
 * @async
 * @function createCategorie
 * @param {Object} req - Objet requête Express (body = données de la catégorie)
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} JSON avec la catégorie créée (201), ou 500 en cas d'erreur serveur
 */
exports.createCategorie = async (req, res) => {
  try {
    const newCategorie = await categorieService.createCategorie(req.body);
    res.status(201).json(newCategorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de créer la catégorie" });
  }
};

/**
 * Met à jour une catégorie existante.
 * @async
 * @function updateCategorie
 * @param {Object} req - Objet requête Express (params.id = ID, body = nouvelles données)
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} JSON avec la catégorie mise à jour (200), 404 si non trouvée, 500 en cas d'erreur serveur
 */
exports.updateCategorie = async (req, res) => {
  try {
    const updatedCategorie = await categorieService.updateCategorie(
      req.params.id,
      req.body
    );

    if (!updatedCategorie)
      return res.status(404).json({ message: "Catégorie non trouvée" });

    res.status(200).json(updatedCategorie);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Impossible de mettre à jour la catégorie" });
  }
};

/**
 * Supprime une catégorie.
 * @async
 * @function deleteCategorie
 * @param {Object} req - Objet requête Express (params.id = ID de la catégorie)
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>} Message de succès (200), 404 si non trouvée, 500 en cas d'erreur serveur
 */
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
