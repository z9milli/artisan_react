import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Liste from "./pages/Liste";
import Fiche from "./pages/Fiche";
import Erreur from "./pages/Erreur";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

/**
 * Composant principal de l'application React.
 *
 * Gère la navigation (routing) via react-router-dom, et inclut
 * la barre de navigation et le footer sur toutes les pages.
 *
 * Routes définies :
 * - "/" : Page d'accueil (Accueil.jsx)
 * - "/categorie/:nom" : Liste des artisans filtrée par catégorie (Liste.jsx)
 * - "/fiche/:id" : Fiche détaillée d'un artisan (Fiche.jsx)
 * - "*" : Page d'erreur pour toutes les routes non définies (Erreur.jsx)
 *
 * @component
 * @returns {JSX.Element} L'application complète avec routes, Navbar et Footer
 */
function App() {
  return (
    <Router>
      {/* Navbar visible sur toutes les pages */}
      <Navbar />

      {/* Contenu principal avec hauteur minimale pour le layout */}
      <main style={{ minHeight: "70vh" }}>
        <Routes>
          {/* Route page d'accueil */}
          <Route path="/" element={<Accueil />} />

          {/* Route liste d'artisans filtrée par catégorie */}
          <Route path="/categorie/:nom" element={<Liste />} />

          {/* Route fiche détaillée d'un artisan */}
          <Route path="/fiche/:id" element={<Fiche />} />

          {/* Route pour toutes les autres URL : page 404 */}
          <Route path="*" element={<Erreur />} />
        </Routes>
      </main>

      {/* Footer visible sur toutes les pages */}
      <Footer />
    </Router>
  );
}

export default App;
