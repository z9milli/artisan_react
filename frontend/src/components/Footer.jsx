import React from "react";
import "../styles/Footer.scss";

/**
 * Composant Footer du site.
 *
 * Affiche les informations de contact dans la colonne gauche
 * et les liens légaux et d'accessibilité dans la colonne droite.
 *
 * @component
 * @returns {JSX.Element} Le footer complet du site
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="row justify-content-between">
          {/* Colonne gauche : coordonnées de contact */}
          <div className="col-6 column-left">
            <address className="mb-0">
              <p>101 cours Charlemagne</p>
              <p>CS 20033</p>
              <p>69269 LYON CEDEX 02</p>
              <p>France</p>
              <p>+33 (0)4 23 45 67 89</p>
            </address>
          </div>

          {/* Colonne droite : liens légaux et accessibilité */}
          <div className="col-6 column-right">
            <p>
              <a href="/mentions" className="text-decoration-none text-reset">
                Mentions légales
              </a>
            </p>
            <p>
              <a href="/données" className="text-decoration-none text-reset">
                Données personnelles
              </a>
            </p>
            <p>
              <a
                href="/accessibilité"
                className="text-decoration-none text-reset"
              >
                Accessibilité
              </a>
            </p>
            <p>
              <a href="/cookies" className="text-decoration-none text-reset">
                Cookies
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
