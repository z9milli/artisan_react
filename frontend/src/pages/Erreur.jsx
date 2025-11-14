import React from "react";
import "../styles/Erreur.scss";

/**
 * Page d'erreur 404.
 *
 * Affiche une image et un message indiquant que la page demandée
 * n'a pas été trouvée.
 *
 * @component
 * @returns {JSX.Element} Contenu de la page d'erreur 404
 */
const Erreur = () => {
  return (
    <div className="erreur-container">
      {/* Image illustrant l'erreur 404 */}
      <img src="/img/404.jpg" alt="Page non trouvée" className="erreur-image" />
      {/* Message de page non trouvée */}
      <h1>Page non trouvée</h1>
    </div>
  );
};

export default Erreur;
