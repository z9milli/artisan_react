import React, { useEffect, useState } from "react";
import "../styles/Accueil.scss";
import "../styles/global.scss";

/**
 * URL de l'API backend.
 * En développement : API locale.
 * En production : API déployée sur Render.
 */
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://tt-artisan.onrender.com"
    : "http://localhost:5050";

/**
 * Génère les étoiles correspondant à la note d'un artisan.
 * Seule la partie entière de la note est utilisée.
 *
 * @param {number} note - Note de l'artisan
 * @returns {string} Chaîne contenant les étoiles à afficher
 */
const renderStars = (note) => {
  if (!note) return "";

  const fullStars = Math.floor(note);

  return "⭐".repeat(fullStars);
};

/**
 * Page d'accueil du site.
 *
 * Affiche :
 * - les étapes pour trouver un artisan
 * - les trois artisans du mois récupérés depuis l'API
 *
 * @component
 * @returns {JSX.Element} Contenu de la page d'accueil
 */
const Accueil = () => {
  const [artisans, setArtisans] = useState([]);

  /**
   * Récupère les artisans du mois depuis l'API backend.
   */
  const fetchArtisansDuMois = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/artisans/mois`);

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des artisans du mois");
      }

      const data = await response.json();

      setArtisans(data);
    } catch (error) {
      console.error("Erreur fetchArtisansDuMois :", error);

      setArtisans([]);
    }
  };

  /**
   * Charge les artisans du mois au premier affichage de la page.
   */
  useEffect(() => {
    fetchArtisansDuMois();
  }, []);

  return (
    <main className="accueil container py-4">
      <h1 className="mb-4 text-center title-small">
        Comment trouver mon artisan ?
      </h1>

      {/* Étapes d'utilisation du service */}
      <section className="etapes-container border rounded p-3">
        <div className="row g-1">
          <div className="col-12 col-md-6">
            <div className="etape p-2">
              1. Choisir la catégorie d'artisanat dans le menu.
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="etape p-2">2. Choisir un artisan.</div>
          </div>

          <div className="col-12 col-md-6">
            <div className="etape p-2">
              3. Le contacter via le formulaire de contact.
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="etape p-2">
              4. Une réponse sera apportée sous 48h.
            </div>
          </div>
        </div>
      </section>

      {/* Artisans mis en avant */}
      <section className="mb-4 text-center title-small">
        <h2>Les trois artisans du mois</h2>

        <div className="row mt-2 g-3">
          {artisans.map((artisan) => (
            <div className="col-12 col-md-4" key={artisan.id_artisan}>
              <div className="artisan-top border rounded p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="card-title mb-0">{artisan.nom}</p>

                  <p className="mb-0">
                    {artisan.note} {renderStars(artisan.note)}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">{artisan.specialite?.nom_specialite}</p>
                  <p className="mb-0">{artisan.ville}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Accueil;
