import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.scss";

/**
 * Composant Navbar du site.
 *
 * Affiche le logo, les liens vers les catégories et une barre de recherche.
 * La recherche redirige vers la page de résultats avec la query string.
 *
 * @component
 * @returns {JSX.Element} Barre de navigation complète
 */
const Navbar = () => {
  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  /**
   * Gestionnaire de soumission du formulaire de recherche.
   * Redirige vers la page de recherche avec la query string.
   * @param {React.FormEvent<HTMLFormElement>} e - Événement de soumission
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        {/* Logo cliquable vers la page d'accueil */}
        <Link className="navbar-brand" to="/">
          <img src="./img/logo.png" alt="TT Artisan" height="80" />
        </Link>

        {/* Bouton toggler pour mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Liens vers les catégories */}
          <ul className="navbar-nav ml-links me-auto mb-2 mb-lg-0">
            <li className="nav-item me-5">
              <Link className="nav-link" to="/categorie/Bâtiment">
                Bâtiment
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/categorie/Services">
                Services
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/categorie/Fabrication">
                Fabrication
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/categorie/Alimentation">
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
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
