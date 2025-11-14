import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Liste from "./pages/Liste";
import Fiche from "./pages/Fiche";
import Erreur from "./pages/Erreur"; 
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar/>
            <main style={{ minHeight: "70vh" }}>

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/categorie/:nom" element={<Liste />} />
        <Route path="/fiche/:id" element={<Fiche />} />
        <Route path="*" element={<Erreur />} />
      </Routes>
      </main>
    <Footer/>
    </Router>
  );
}

export default App;
