import React from "react";
import "../styles/Footer.scss";

/**
 * Composant Footer du site.
 *
 * Affiche les coordonnées de contact ainsi que
 * les liens légaux et d'accessibilité.
 *
 * @component
 * @returns {JSX.Element} Footer du site
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="row justify-content-between">
          {/* Coordonnées de contact */}
          <div className="col-6 column-left">
            <address className="mb-0">
              <p>101 cours Charlemagne</p>
              <p>CS 20033</p>
              <p>69269 LYON CEDEX 02</p>
              <p>France</p>
              <p>+33 (0)4 23 45 67 89</p>
            </address>
          </div>

          {/* Liens légaux */}
          <div className="col-6 column-right">
            <p>
              <a href="/mentions" className="text-decoration-none text-reset">
                Mentions légales
              </a>
            </p>
            <p>
              <a href="/donnees" className="text-decoration-none text-reset">
                Données personnelles
              </a>
            </p>
            <p>
              <a
                href="/accessibilite"
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
