// Point d'entrée de l'application Express.
// Configure les middlewares, les routes et démarre le serveur.

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5050; // Port du serveur

// --- Middlewares ---

/**
 * Middleware CORS pour autoriser les requêtes cross-origin
 */
app.use(cors());

/**
 * Middleware pour parser le JSON dans le body des requêtes
 */
app.use(express.json());

/**
 * Middleware pour parser les données encodées en URL
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware global pour logger les requêtes
 */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// --- Route test ---

/**
 * @route GET /
 * @description Route test pour vérifier que le serveur fonctionne
 * @returns {Object} Message "Hello world"
 */
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

// --- Import des routes ---

const artisanRoutes = require("./routes/artisans");
const specialiteRoutes = require("./routes/specialites");
const categorieRoutes = require("./routes/categories");

/**
 * Routes API pour les artisans
 */
app.use("/api/artisans", artisanRoutes);

/**
 * Routes API pour les spécialités
 */
app.use("/api/specialites", specialiteRoutes);

/**
 * Routes API pour les catégories
 */
app.use("/api/categories", categorieRoutes);

// --- Démarrage du serveur ---

app.listen(port, () => {
  console.log("Serveur démarré sur le port " + port);
});
