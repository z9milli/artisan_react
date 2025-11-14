import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.scss";

const NavbarComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Gestion de la recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="./img/logo.png" alt="TT Artisan" height="80" />
        </Link>
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

export default NavbarComponent;