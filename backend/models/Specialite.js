module.exports = (sequelize, DataTypes) => {
    
  const Specialite = sequelize.define('specialite', {
    id_specialite: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_specialite: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    id_categorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categorie', 
        key: 'id_categorie'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    }
  }, {
    freezeTableName: true ,
    timestamps: false
  });

  return Specialite;
};
