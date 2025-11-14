import React from "react";
import { Link } from "react-router-dom";
import "../styles/ArtisanCard.scss";

const ArtisanCard = ({ artisan }) => {
  if (!artisan) return null;

  return (
    <Link
      to={`/fiche/${artisan.id_artisan}`}
      className="text-decoration-none text-dark"
    >
      <div className="liste-card border rounded p-3  artisan-card-hover">
        {/* Ligne 1 : Nom + Note */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p className="card-title mb-0">{artisan.nom}</p>
          {/* Note en étoiles + chiffre */}
          <div className="d-flex align-items-center gap-1">
            <span className="note">{artisan.note}</span>
            <span>{"⭐".repeat(artisan.note) || "⭐"}</span>
          </div>
        </div>

        {/* Ligne 2 : Spécialité + Ville */}
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">
            {artisan.specialite?.nom || artisan.nom_specialite || "—"}
          </p>
          <p className="mb-0">{artisan.ville}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArtisanCard;
