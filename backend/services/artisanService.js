// Service gérant la logique métier liée aux artisans.
// Le service délègue les opérations CRUD aux modèles Sequelize
// et utilise les jointures Sequelize pour récupérer les données liées.

const db = require("../models");
const Artisan = db.Artisan;
const Specialite = db.Specialite;
const Categorie = db.Categorie;

/**
 * Récupère tous les artisans avec leur spécialité.
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
 * Récupère les 3 artisans du mois avec leur spécialité.
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
 * Récupère tous les artisans d'une catégorie donnée
 * en utilisant une jointure Artisan -> Specialite -> Categorie.
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
 * Récupère un artisan par son ID avec sa spécialité.
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
 */
exports.createArtisan = async (data) => {
  return await Artisan.create(data);
};

/**
 * Met à jour un artisan existant.
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
 * Supprime un artisan.
 */
exports.deleteArtisan = async (id) => {
  const deleted = await Artisan.destroy({
    where: { id_artisan: id },
  });

  return deleted > 0;
};