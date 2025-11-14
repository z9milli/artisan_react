module.exports = (sequelize, DataTypes) => {
    
  const Artisan = sequelize.define('artisan', {
    id_artisan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    note: {
      type: DataTypes.DECIMAL(2,1),
      allowNull: false
    },
    ville: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    a_propos: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    site_web: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    top: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    id_specialite: {  
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'specialite', 
        key: 'id_specialite'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return Artisan;
};


