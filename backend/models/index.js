/**
 * Point d'entrée pour tous les modèles Sequelize.
 * Configure la connexion à la base de données et initialise les modèles.
 */

const dbConfig = require("../config/db"); // Configuration de la base de données
const { Sequelize, DataTypes } = require("sequelize");

/**
 * Création de l'instance Sequelize pour la connexion à la base
 * @type {Sequelize}
 */
const sequelize = new Sequelize(
  dbConfig.DB_NAME, // Nom de la base
  dbConfig.USER, // Utilisateur
  dbConfig.PASSWORD, // Mot de passe
  {
    host: dbConfig.HOST, // Hôte
    dialect: dbConfig.dialect, // Type de base (mysql)
    port: dbConfig.port, // Port de connexion
  }
);

/**
 * Test de la connexion à la base de données
 */
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((err) => {
    console.error("Erreur de connexion :", err);
  });

/**
 * Conteneur pour tous les modèles et l'instance Sequelize
 * @type {Object}
 */
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * Initialisation des modèles
 */
db.Artisan = require("./Artisan")(sequelize, DataTypes);
db.Categorie = require("./Categorie")(sequelize, DataTypes);
db.Specialite = require("./Specialite")(sequelize, DataTypes);

/**
 * Export du conteneur db contenant Sequelize et tous les modèles
 * @module db
 */
module.exports = db;
