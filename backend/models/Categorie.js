/**
 * Modèle Sequelize représentant une catégorie.
 * Définit la structure de la table "categorie" dans la base de données.
 */

module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define(
    "categorie",
    {
      id_categorie: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom_categorie: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Categorie;
};
