import React from "react";
import { Link } from "react-router-dom";
import "../styles/ArtisanCard.scss";

/**
 * Composant affichant une carte résumé pour un artisan.
 *
 * La carte présente les informations principales de l'artisan
 * et redirige vers sa fiche détaillée au clic.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.artisan - Objet artisan à afficher
 * @param {number} props.artisan.id_artisan - ID unique de l'artisan
 * @param {string} props.artisan.nom - Nom de l'artisan
 * @param {number} props.artisan.note - Note de l'artisan
 * @param {Object} props.artisan.specialite - Spécialité associée à l'artisan
 * @param {string} props.artisan.specialite.nom_specialite - Nom de la spécialité
 * @param {string} props.artisan.ville - Ville de l'artisan
 * @returns {JSX.Element|null} Carte artisan ou null si aucun artisan n'est fourni
 */
const ArtisanCard = ({ artisan }) => {
  // Évite une erreur d'affichage si aucun artisan n'est transmis au composant
  if (!artisan) return null;

  return (
    <Link
      to={`/fiche/${artisan.id_artisan}`}
      className="text-decoration-none text-dark"
    >
      <div className="liste-card border rounded p-3 artisan-card-hover">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p className="card-title mb-0">{artisan.nom}</p>

          <div className="d-flex align-items-center gap-1">
            <span className="note">{artisan.note}</span>
            <span>{"⭐".repeat(Math.round(artisan.note)) || "⭐"}</span>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">{artisan.specialite?.nom_specialite}</p>
          <p className="mb-0">{artisan.ville}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArtisanCard;