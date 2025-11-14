import React, { useEffect, useState } from "react";
import "../styles/Accueil.scss";
import "../styles/global.scss";

/**
 * URL de l'API backend.
 * Idéalement à mettre dans un fichier .env pour React.
 */
const REACT_APP_API_URL = "http://localhost:5050";

/**
 * Fonction utilitaire pour afficher les étoiles correspondant à une note.
 * N'affiche que la partie entière de la note.
 *
 * @param {number} note - Note de l'artisan (ex: 4.5)
 * @returns {string} Étoiles correspondant à la note
 */
const renderStars = (note) => {
  if (!note) return "";
  const fullStars = Math.floor(note); // partie entière uniquement
  return "⭐".repeat(fullStars);
};

/**
 * Page d'accueil du site.
 * Affiche les étapes pour trouver un artisan et les trois artisans du mois.
 *
 * @component
 * @returns {JSX.Element} Contenu de la page d'accueil
 */
const Accueil = () => {
  // État pour stocker les artisans du mois
  const [artisans, setArtisans] = useState([]);

  /**
   * Récupère les trois artisans du mois depuis l'API backend.
   * Met à jour l'état `artisans`.
   */
  const fetchArtisansDuMois = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/api/artisans/mois`);
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des artisans du mois");
      const data = await response.json();
      setArtisans(data);
    } catch (error) {
      console.error("Erreur fetchArtisansDuMois :", error);
      setArtisans([]);
    }
  };

  // Récupération des artisans du mois au chargement du composant
  useEffect(() => {
    fetchArtisansDuMois();
  }, []);

  return (
    <div className="accueil container py-4">
      <h1 className="mb-4 text-center title-small">
        Comment trouver mon artisan ?
      </h1>

      {/* Étapes pour trouver un artisan */}
      <div className="etapes-container border rounded p-3">
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
      </div>

      {/* Section des trois artisans du mois */}
      <div className="mb-4 text-center title-small">
        <h2>Les trois artisans du mois</h2>

        <div className="row mt-2 g-3">
          {artisans.map((artisan) => (
            <div className="col-12 col-md-4" key={artisan.id_artisan}>
              <div className="artisan-top border rounded p-3">
                {/* Ligne nom + note */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="card-title mb-0">{artisan.nom}</p>
                  <p className="mb-0">
                    {artisan.note} {renderStars(artisan.note)}
                  </p>
                </div>

                {/* Ligne spécialité + ville */}
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">{artisan.specialite?.nom_specialite}</p>
                  <p className="mb-0">{artisan.ville}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accueil;
