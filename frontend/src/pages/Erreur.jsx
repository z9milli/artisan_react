import React from "react";
import "../styles/Erreur.scss";

const Erreur = () => {
  return (
    <div className="erreur-container">
      <img src="/img/404.jpg" alt="Page non trouvée" className="erreur-image" />
      <h1>Page non trouvée</h1>
    </div>
  );
};

export default Erreur;
