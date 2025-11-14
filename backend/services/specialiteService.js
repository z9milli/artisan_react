// Service gérant la logique métier liée aux spécialités.
// Effectue les opérations CRUD et ajoute la logique métier (ex: jointure avec catégorie).

const db = require("../models");
const Specialite = db.Specialite;
const Categorie = db.Categorie;

/**
 * Ajoute les informations de catégorie à une liste de spécialités.
 * @async
 * @param {Array<Object>} specialites - Liste d'instances Specialite
 * @returns {Promise<Array<Object>>} Liste de spécialités avec champ 'categorie' attaché
 */
const attachCategorieToSpecialites = async (specialites) => {
  return await Promise.all(
    specialites.map(async (spec) => {
      const categorie = await Categorie.findByPk(spec.id_categorie);
      return { ...spec.toJSON(), categorie };
    })
  );
};

/**
 * Récupère toutes les spécialités avec leur catégorie.
 * @async
 * @function fetchAllSpecialites
 * @returns {Promise<Array<Object>>} Liste de toutes les spécialités avec leur catégorie
 */
exports.fetchAllSpecialites = async () => {
  const specialites = await Specialite.findAll();
  return attachCategorieToSpecialites(specialites);
};

/**
 * Récupère une spécialité par son ID avec sa catégorie.
 * @async
 * @function fetchSpecialiteById
 * @param {number} id - ID de la spécialité
 * @returns {Promise<Object|null>} Spécialité avec sa catégorie, ou null si non trouvée
 */
exports.fetchSpecialiteById = async (id) => {
  const specialite = await Specialite.findByPk(id);
  if (!specialite) return null;

  const categorie = await Categorie.findByPk(specialite.id_categorie);
  return { ...specialite.toJSON(), categorie };
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
 * @param {number} id - ID de la spécialité à mettre à jour
 * @param {Object} data - Données à mettre à jour
 * @returns {Promise<Object|null>} Spécialité mise à jour ou null si non trouvée
 */
exports.updateSpecialite = async (id, data) => {
  const [updated] = await Specialite.update(data, {
    where: { id_specialite: id },
  });
  if (!updated) return null;

  return await Specialite.findByPk(id);
};

/**
 * Supprime une spécialité.
 * @async
 * @function deleteSpecialite
 * @param {number} id - ID de la spécialité à supprimer
 * @returns {Promise<boolean>} true si supprimée, false si non trouvée
 */
exports.deleteSpecialite = async (id) => {
  const deleted = await Specialite.destroy({ where: { id_specialite: id } });
  return deleted > 0;
};
