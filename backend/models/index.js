/**
 * Point d'entrée pour tous les modèles Sequelize.
 * Configure la connexion à la base de données et initialise les modèles.
 */

const dbConfig = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    dialectOptions: dbConfig.dialectOptions,
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((err) => {
    console.error("Erreur de connexion :", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Artisan = require("./Artisan")(sequelize, DataTypes);
db.Categorie = require("./Categorie")(sequelize, DataTypes);
db.Specialite = require("./Specialite")(sequelize, DataTypes);

/**
 * Associations entre les modèles.
 * Elles permettent d'utiliser les jointures Sequelize avec include.
 */
db.Artisan.belongsTo(db.Specialite, {
  foreignKey: "id_specialite",
  as: "specialite",
});

db.Specialite.belongsTo(db.Categorie, {
  foreignKey: "id_categorie",
  as: "categorie",
});

module.exports = db;
