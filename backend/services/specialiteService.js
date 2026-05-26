// Service gérant la logique métier liée aux spécialités.
// Les requêtes utilisent Sequelize et ses jointures pour récupérer les catégories associées.

const db = require("../models");
const Specialite = db.Specialite;
const Categorie = db.Categorie;

/**
 * Récupère toutes les spécialités avec leur catégorie associée.
 * @async
 * @function fetchAllSpecialites
 * @returns {Promise<Array<Object>>} Liste des spécialités avec leur catégorie
 */
exports.fetchAllSpecialites = async () => {
  return await Specialite.findAll({
    include: [
      {
        model: Categorie,
        as: "categorie",
      },
    ],
  });
};

/**
 * Récupère une spécialité grâce à son ID avec sa catégorie associée.
 * @async
 * @function fetchSpecialiteById
 * @param {number} id - ID de la spécialité recherchée
 * @returns {Promise<Object|null>} Spécialité trouvée avec sa catégorie, ou null si non trouvée
 */
exports.fetchSpecialiteById = async (id) => {
  return await Specialite.findByPk(id, {
    include: [
      {
        model: Categorie,
        as: "categorie",
      },
    ],
  });
};

/**
 * Crée une nouvelle spécialité.
 * @async
 * @function createSpecialite
 * @param {Object} data - Données de la spécialité à créer
 * @returns {Promise<Object>} Spécialité créée
 */
exports.createSpecialite = async (data) => {
  return await Specialite.create(data);
};

/**
 * Met à jour une spécialité existante.
 * @async
 * @function updateSpecialite
 * @param {number} id - ID de la spécialité à modifier
 * @param {Object} data - Nouvelles données de la spécialité
 * @returns {Promise<Object|null>} Spécialité mise à jour, ou null si non trouvée
 */
exports.updateSpecialite = async (id, data) => {
  const [updated] = await Specialite.update(data, {
    where: { id_specialite: id },
  });

  if (!updated) return null;

  return await Specialite.findByPk(id, {
    include: [
      {
        model: Categorie,
        as: "categorie",
      },
    ],
  });
};

/**
 * Supprime une spécialité grâce à son ID.
 * @async
 * @function deleteSpecialite
 * @param {number} id - ID de la spécialité à supprimer
 * @returns {Promise<boolean>} true si la suppression a réussi, false sinon
 */
exports.deleteSpecialite = async (id) => {
  const deleted = await Specialite.destroy({
    where: { id_specialite: id },
  });

  return deleted > 0;
};
