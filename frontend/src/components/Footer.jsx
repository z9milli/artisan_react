import React from "react";
import "../styles/Footer.scss";


function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="row justify-content-between">
          {/* Colonne gauche */}
          <div className="col-6 column-left">
            <p>101 cours Charlemagne</p>
            <p>CS 20033</p>
            <p>69269 LYON CEDEX 02</p>
            <p>France</p>
            <p>+33 (0)4 23 45 67 89</p>
          </div>

          {/* Colonne droite */}
          <div className="col-6 column-right">
            <p>Mentions légales</p>
            <p>Données personnelles</p>
            <p>Accessibilité</p>
            <p>Cookies</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
