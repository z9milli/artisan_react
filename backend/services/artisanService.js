// Service gérant la logique métier liée aux artisans.
// Les requêtes utilisent Sequelize et ses jointures pour limiter les appels inutiles à la base de données.

const db = require("../models");
const Artisan = db.Artisan;
const Specialite = db.Specialite;
const Categorie = db.Categorie;

/**
 * Récupère tous les artisans avec leur spécialité associée.
 * @async
 * @function fetchAllArtisans
 * @returns {Promise<Array<Object>>} Liste de tous les artisans avec leur spécialité
 */
exports.fetchAllArtisans = async () => {
  return await Artisan.findAll({
    include: [
      {
        model: Specialite,
        as: "specialite",
      },
    ],
  });
};

/**
 * Récupère les trois artisans du mois.
 * @async
 * @function fetchArtisansDuMois
 * @returns {Promise<Array<Object>>} Liste des artisans du mois avec leur spécialité
 */
exports.fetchArtisansDuMois = async () => {
  return await Artisan.findAll({
    where: { top: true },
    limit: 3,
    include: [
      {
        model: Specialite,
        as: "specialite",
      },
    ],
  });
};

/**
 * Récupère les artisans appartenant à une catégorie donnée.
 * La jointure permet de passer par la spécialité pour atteindre la catégorie.
 * @async
 * @function fetchArtisansByCategorie
 * @param {string} categorieNom - Nom de la catégorie recherchée
 * @returns {Promise<Array<Object>>} Liste des artisans de la catégorie demandée
 */
exports.fetchArtisansByCategorie = async (categorieNom) => {
  return await Artisan.findAll({
    include: [
      {
        model: Specialite,
        as: "specialite",
        required: true,
        include: [
          {
            model: Categorie,
            as: "categorie",
            where: { nom_categorie: categorieNom },
            required: true,
          },
        ],
      },
    ],
  });
};

/**
 * Recherche des artisans par nom, ville ou spécialité.
 * @async
 * @function searchArtisans
 * @param {string} query - Mot-clé saisi par l'utilisateur
 * @throws {Error} Si le paramètre de recherche est manquant
 * @returns {Promise<Array<Object>>} Liste des artisans correspondant à la recherche
 */
exports.searchArtisans = async (query) => {
  if (!query) throw new Error("Paramètre de recherche manquant");

  return await Artisan.findAll({
    where: {
      [db.Sequelize.Op.or]: [
        {
          nom: {
            [db.Sequelize.Op.like]: `%${query}%`,
          },
        },
        {
          ville: {
            [db.Sequelize.Op.like]: `%${query}%`,
          },
        },
        {
          "$specialite.nom_specialite$": {
            [db.Sequelize.Op.like]: `%${query}%`,
          },
        },
      ],
    },
    include: [
      {
        model: Specialite,
        as: "specialite",
        required: false,
      },
    ],
  });
};

/**
 * Récupère un artisan par son ID avec sa spécialité associée.
 * @async
 * @function fetchArtisanById
 * @param {number} id - ID de l'artisan recherché
 * @returns {Promise<Object|null>} Artisan trouvé avec sa spécialité, ou null si aucun artisan ne correspond
 */
exports.fetchArtisanById = async (id) => {
  return await Artisan.findByPk(id, {
    include: [
      {
        model: Specialite,
        as: "specialite",
      },
    ],
  });
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
 * @param {number} id - ID de l'artisan à modifier
 * @param {Object} data - Nouvelles données de l'artisan
 * @returns {Promise<Object|null>} Artisan mis à jour avec sa spécialité, ou null si non trouvé
 */
exports.updateArtisan = async (id, data) => {
  const [updated] = await Artisan.update(data, {
    where: { id_artisan: id },
  });

  if (!updated) return null;

  return await Artisan.findByPk(id, {
    include: [
      {
        model: Specialite,
        as: "specialite",
      },
    ],
  });
};

/**
 * Supprime un artisan grâce à son ID.
 * @async
 * @function deleteArtisan
 * @param {number} id - ID de l'artisan à supprimer
 * @returns {Promise<boolean>} true si la suppression a réussi, false sinon
 */
exports.deleteArtisan = async (id) => {
  const deleted = await Artisan.destroy({
    where: { id_artisan: id },
  });

  return deleted > 0;
};
