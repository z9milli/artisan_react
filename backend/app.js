const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5050

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
 console.log(`${req.method} ${req.url}`);
 next();
});
// Route test
app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

const artisanRoutes = require('./routes/artisans');
const specialiteRoutes = require('./routes/specialites');
const categorieRoutes = require('./routes/categories');

app.use('/api/artisans', artisanRoutes);
app.use('/api/specialites', specialiteRoutes);
app.use('/api/categories', categorieRoutes);


app.listen(port, () => {
  console.log('Serveur démarré sur le port ' + port)
});