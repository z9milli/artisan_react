import React from "react";
import { Link } from "react-router-dom";
import "../styles/ArtisanCard.scss";

/**
 * Composant affichant une carte pour un artisan.
 *
 * Affiche le nom, la note (en étoiles et chiffre), la spécialité et la ville.
 * Cliquable, il redirige vers la page détail de l'artisan.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.artisan - Objet artisan à afficher
 * @param {number} props.artisan.id_artisan - ID unique de l'artisan
 * @param {string} props.artisan.nom - Nom de l'artisan
 * @param {number} props.artisan.note - Note de l'artisan (ex: 4.5)
 * @param {Object} props.artisan.specialite - Spécialité de l'artisan
 * @param {string} props.artisan.specialite.nom_specialite - Nom de la spécialité
 * @param {string} props.artisan.ville - Ville de l'artisan
 * @returns {JSX.Element|null} Carte artisan ou null si aucun artisan
 */
const ArtisanCard = ({ artisan }) => {
  // Sécurité : si aucun artisan, ne rien afficher
  if (!artisan) return null;

  return (
    <Link
      to={`/fiche/${artisan.id_artisan}`}
      className="text-decoration-none text-dark"
    >
      <div className="liste-card border rounded p-3 artisan-card-hover">
        {/* Ligne 1 : Nom + Note */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p className="card-title mb-0">{artisan.nom}</p>
          {/* Note en étoiles + chiffre */}
          <div className="d-flex align-items-center gap-1">
            <span className="note">{artisan.note}</span>
            {/* Affiche autant d'étoiles que la note arrondie */}
            <span>{"⭐".repeat(Math.round(artisan.note)) || "⭐"}</span>
          </div>
        </div>

        {/* Ligne 2 : Spécialité + Ville */}
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">{artisan.specialite?.nom_specialite}</p>
          <p className="mb-0">{artisan.ville}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArtisanCard;
