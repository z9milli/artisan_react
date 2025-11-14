const dbConfig = require('../config/db');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB_NAME,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        port: dbConfig.port
    }
);

sequelize.authenticate()
.then(() => {
    console.log('connecté')
})
.catch(err => {
    console.log('Erreur' + err)
});

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Artisan = require('./Artisan')(sequelize, DataTypes);
db.Categorie = require('./Categorie')(sequelize, DataTypes);
db.Specialite = require('./Specialite')(sequelize, DataTypes);

module.exports = db;