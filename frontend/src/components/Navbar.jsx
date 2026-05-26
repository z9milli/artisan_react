import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.scss";

/**
 * Barre de navigation principale du site.
 *
 * Affiche :
 * - le logo du site
 * - les liens vers les catégories
 * - une barre de recherche permettant de rechercher un artisan
 *
 * @component
 * @returns {JSX.Element} Barre de navigation complète
 */
const Navbar = () => {
  // État contenant la valeur saisie dans la barre de recherche
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  /**
   * Gère la soumission du formulaire de recherche.
   * Redirige vers la page de résultats avec la query string.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Événement de soumission du formulaire
   */
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  /**
   * Ferme automatiquement le menu mobile Bootstrap
   * après un clic sur un lien.
   */
  const closeNavbar = () => {
    const navbar = document.getElementById("navbarSupportedContent");

    if (navbar && navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          {/* Logo du site */}
          <Link className="navbar-brand" to="/" onClick={closeNavbar}>
            <img src="./img/logo.png" alt="TT Artisan" height="80" />
          </Link>

          {/* Bouton menu mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Ouvrir le menu de navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Navigation des catégories */}
            <ul className="navbar-nav ml-links me-auto mb-2 mb-lg-0">
              <li className="nav-item me-5">
                <Link
                  className="nav-link"
                  to="/categorie/Bâtiment"
                  onClick={closeNavbar}
                >
                  Bâtiment
                </Link>
              </li>

              <li className="nav-item me-5">
                <Link
                  className="nav-link"
                  to="/categorie/Services"
                  onClick={closeNavbar}
                >
                  Services
                </Link>
              </li>

              <li className="nav-item me-5">
                <Link
                  className="nav-link"
                  to="/categorie/Fabrication"
                  onClick={closeNavbar}
                >
                  Fabrication
                </Link>
              </li>

              <li className="nav-item me-5">
                <Link
                  className="nav-link"
                  to="/categorie/Alimentation"
                  onClick={closeNavbar}
                >
                  Alimentation
                </Link>
              </li>
            </ul>

            {/* Barre de recherche */}
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-3"
                type="search"
                placeholder="Recherche"
                aria-label="Recherche d'un artisan"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
