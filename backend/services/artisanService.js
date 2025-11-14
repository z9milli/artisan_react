// Service gérant la logique métier liée aux artisans.
// Le service délègue les opérations CRUD aux modèles Sequelize
// et ajoute la logique métier (ex: jointure avec spécialité, filtrage, validation).

const db = require("../models");
const Artisan = db.Artisan;
const Specialite = db.Specialite;
const Categorie = db.Categorie;

/**
 * Ajoute les informations de spécialité à une liste d'artisans.
 * @async
 * @param {Array<Object>} artisans - Liste d'instances Artisan
 * @returns {Promise<Array<Object>>} Liste d'artisans avec champ 'specialite' attaché
 */
const attachSpecialiteToArtisans = async (artisans) => {
  return await Promise.all(
    artisans.map(async (artisan) => {
      const specialite = await Specialite.findByPk(artisan.id_specialite);
      return { ...artisan.toJSON(), specialite };
    })
  );
};

/**
 * Récupère tous les artisans.
 * @async
 * @function fetchAllArtisans
 * @returns {Promise<Array<Object>>} Liste de tous les artisans avec leur spécialité
 */
exports.fetchAllArtisans = async () => {
  const artisans = await Artisan.findAll();
  return attachSpecialiteToArtisans(artisans);
};

/**
 * Récupère les 3 artisans du mois (top=true).
 * @async
 * @function fetchArtisansDuMois
 * @returns {Promise<Array<Object>>} Liste des 3 artisans du mois avec leur spécialité
 */
exports.fetchArtisansDuMois = async () => {
  const artisans = await Artisan.findAll({
    where: { top: true },
    limit: 3,
  });
  return attachSpecialiteToArtisans(artisans);
};

/**
 * Récupère tous les artisans d'une catégorie donnée.
 * @async
 * @function fetchArtisansByCategorie
 * @param {string} categorieNom - Nom de la catégorie
 * @returns {Promise<Array<Object>|null>} Liste des artisans ou null si catégorie inexistante
 */
exports.fetchArtisansByCategorie = async (categorieNom) => {
  const categorie = await Categorie.findOne({
    where: { nom_categorie: categorieNom },
  });
  if (!categorie) return null;

  const specialites = await Specialite.findAll({
    where: { id_categorie: categorie.id_categorie },
  });
  const specialiteIds = specialites.map((s) => s.id_specialite);

  const artisans = await Artisan.findAll({
    where: { id_specialite: specialiteIds },
  });
  return attachSpecialiteToArtisans(artisans);
};

/**
 * Recherche des artisans par nom.
 * @async
 * @function searchArtisans
 * @param {string} query - Mot clé de recherche
 * @throws {Error} Si le paramètre de recherche est manquant
 * @returns {Promise<Array<Object>>} Liste des artisans correspondant à la recherche
 */
exports.searchArtisans = async (query) => {
  if (!query) throw new Error("Paramètre de recherche manquant");

  const artisans = await Artisan.findAll({
    where: {
      nom: {
        [db.Sequelize.Op.like]: `%${query}%`,
      },
    },
  });

  return attachSpecialiteToArtisans(artisans);
};

/**
 * Récupère un artisan par son ID.
 * @async
 * @function fetchArtisanById
 * @param {number} id - ID de l'artisan
 * @returns {Promise<Object|null>} Artisan avec sa spécialité, ou null si non trouvé
 */
exports.fetchArtisanById = async (id) => {
  const artisan = await Artisan.findByPk(id);
  if (!artisan) return null;

  const specialite = await Specialite.findByPk(artisan.id_specialite);
  return { ...artisan.toJSON(), specialite };
};

/**
 * Crée un nouvel artisan.
 * @async
 * @function createArtisan
 * @param {Object} data - Données de l'artisan à créer
 * @returns {Promise<Object>} Artisan créé
 */
exports.createArtisan = async (data) => {
  return await Artisan.create(data);
};

/**
 * Met à jour un artisan existant.
 * @async
 * @function updateArtisan
 * @param {number} id - ID de l'artisan à mettre à jour
 * @param {Object} data - Données à mettre à jour
 * @returns {Promise<Object|null>} Artisan mis à jour, ou null si non trouvé
 */
exports.updateArtisan = async (id, data) => {
  const [updated] = await Artisan.update(data, { where: { id_artisan: id } });
  if (!updated) return null;

  return await Artisan.findByPk(id);
};

/**
 * Supprime un artisan.
 * @async
 * @function deleteArtisan
 * @param {number} id - ID de l'artisan à supprimer
 * @returns {Promise<boolean>} true si supprimé, false si non trouvé
 */
exports.deleteArtisan = async (id) => {
  const deleted = await Artisan.destroy({ where: { id_artisan: id } });
  return deleted > 0;
};
