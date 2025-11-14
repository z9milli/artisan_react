import React, { useEffect, useState } from "react";
import "../styles/Accueil.scss";

const REACT_APP_API_URL = "http://localhost:5050";

const Accueil = () => {
  const [artisans, setArtisans] = useState([]);

  // Fonction pour récupérer les artisans du mois
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

  useEffect(() => {
    fetchArtisansDuMois();
  }, []);

  return (
    <div className="accueil container py-4">
      <h1 className="mb-4 text-center title-small">
        Comment trouver mon artisan ?
      </h1>

      {/* Border unique + background color */}
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

      <div className="mb-4 text-center title-small">
        <h2>Les trois artisans du mois</h2>

        <div className="row mt-2 g-3">
          {artisans.map((artisan) => (
            <div className="col-12 col-md-4" key={artisan.id_artisan}>
              <div className="artisan-top border rounded p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="card-title mb-0">{artisan.nom}</p>
                  <p className="mb-0"> {artisan.note}</p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">{artisan.id_specialite}</p>
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
