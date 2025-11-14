module.exports = (sequelize, DataTypes) => {
    
  const Categorie = sequelize.define('categorie', {
    id_categorie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_categorie: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return Categorie;
};
