// Point d'entrée de l'application Express.
// Configure les middlewares, les routes API et démarre le serveur.

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5050;

// --------------------
// Configuration CORS
// --------------------

/**
 * Liste des origines autorisées à accéder à l'API.
 * Limite les requêtes aux applications connues.
 */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5050",
  "https://TON-URL-FRONTEND.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// --------------------
// Middlewares Express
// --------------------

/**
 * Permet de lire les données JSON envoyées dans les requêtes.
 */
app.use(express.json());

/**
 * Permet de lire les données envoyées via des formulaires.
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware global affichant les requêtes dans le terminal.
 */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// --------------------
// Route de test
// --------------------

/**
 * Vérifie que le serveur Express fonctionne correctement.
 */
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

// --------------------
// Import des routes API
// --------------------

const artisanRoutes = require("./routes/artisans");
const specialiteRoutes = require("./routes/specialites");
const categorieRoutes = require("./routes/categories");

// --------------------
// Fichiers statiques React
// --------------------

/**
 * Sert les fichiers du build React.
 */
app.use(express.static(path.join(__dirname, "frontend", "build")));

// --------------------
// Routes API
// --------------------

app.use("/api/artisans", artisanRoutes);
app.use("/api/specialites", specialiteRoutes);
app.use("/api/categories", categorieRoutes);

// --------------------
// Fallback React Router
// --------------------

/**
 * Toutes les routes non API renvoient le fichier index.html.
 * Permet à React Router de gérer la navigation côté frontend.
 */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

// --------------------
// Démarrage du serveur
// --------------------

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
