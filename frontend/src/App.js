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
 * Gère la navigation avec React Router et affiche
 * la navbar et le footer sur toutes les pages.
 *
 * Routes définies :
 * - "/" : page d'accueil
 * - "/categorie/:nom" : liste des artisans filtrée par catégorie
 * - "/recherche" : résultats de recherche
 * - "/fiche/:id" : fiche détaillée d'un artisan
 * - "*" : page d'erreur 404
 *
 * @component
 * @returns {JSX.Element} Application complète
 */
function App() {
  return (
    <Router>
      {/* Navbar visible sur toutes les pages */}
      <Navbar />

      {/* Contenu principal de l'application */}
      <main style={{ minHeight: "70vh" }}>
        <Routes>
          <Route path="/" element={<Accueil />} />

          <Route path="/categorie/:nom" element={<Liste />} />

          <Route path="/recherche" element={<Liste />} />

          <Route path="/fiche/:id" element={<Fiche />} />

          <Route path="*" element={<Erreur />} />
        </Routes>
      </main>

      {/* Footer visible sur toutes les pages */}
      <Footer />
    </Router>
  );
}

export default App;