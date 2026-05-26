import React from "react";
import "../styles/Erreur.scss";

/**
 * Page d'erreur 404.
 *
 * Affiche un message et une illustration lorsque
 * la page demandée n'existe pas.
 *
 * @component
 * @returns {JSX.Element} Page d'erreur 404
 */
const Erreur = () => {
  return (
    <main className="erreur-container">
      {/* Illustration de l'erreur 404 */}
      <img src="/img/404.jpg" alt="Page non trouvée" className="erreur-image" />

      {/* Message affiché à l'utilisateur */}
      <h1>Page non trouvée</h1>
    </main>
  );
};

export default Erreur;
