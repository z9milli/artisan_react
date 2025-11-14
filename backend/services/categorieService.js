// Service gérant la logique métier liée aux catégories.
// Effectue les opérations CRUD en déléguant à Sequelize.

// Import des modèles
const db = require("../models");
const Categorie = db.Categorie;

/**
 * Récupère toutes les catégories.
 * @async
 * @function fetchAllCategories
 * @returns {Promise<Array<Object>>} Liste de toutes les catégories
 */
exports.fetchAllCategories = async () => {
  return await Categorie.findAll();
};

/**
 * Récupère une catégorie par son ID.
 * @async
 * @function fetchCategorieById
 * @param {number} id - ID de la catégorie
 * @returns {Promise<Object|null>} Catégorie trouvée ou null si non existante
 */
exports.fetchCategorieById = async (id) => {
  return await Categorie.findByPk(id);
};

/**
 * Crée une nouvelle catégorie.
 * @async
 * @function createCategorie
 * @param {Object} data - Données de la catégorie à créer
 * @returns {Promise<Object>} Catégorie créée
 */
exports.createCategorie = async (data) => {
  // Exemple de validation possible :
  // if (!data.nom) throw new Error("Le nom est obligatoire");

  return await Categorie.create(data);
};

/**
 * Met à jour une catégorie existante.
 * @async
 * @function updateCategorie
 * @param {number} id - ID de la catégorie à mettre à jour
 * @param {Object} data - Données à mettre à jour
 * @returns {Promise<Object|null>} Catégorie mise à jour ou null si non trouvée
 */
exports.updateCategorie = async (id, data) => {
  const [updated] = await Categorie.update(data, {
    where: { id_categorie: id },
  });
  if (!updated) return null;

  return await Categorie.findByPk(id);
};

/**
 * Supprime une catégorie.
 * @async
 * @function deleteCategorie
 * @param {number} id - ID de la catégorie à supprimer
 * @returns {Promise<boolean>} true si supprimée, false si non trouvée
 */
exports.deleteCategorie = async (id) => {
  const deleted = await Categorie.destroy({ where: { id_categorie: id } });
  return deleted > 0;
};
