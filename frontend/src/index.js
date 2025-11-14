import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/**
 * Point d'entrée principal de l'application React.
 *
 * Utilise ReactDOM.createRoot pour monter l'application dans
 * l'élément HTML ayant l'id "root".
 *
 * React.StrictMode est activé pour détecter les problèmes potentiels
 * lors du développement (double rendu de certains composants, warnings, etc.).
 */

/** Création de la racine React */
const root = ReactDOM.createRoot(document.getElementById("root"));

/** Rendu de l'application principale */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
