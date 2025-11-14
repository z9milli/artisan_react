import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtisanCard from "../components/ArtisanCard";

/**
 * Page affichant la liste des artisans.
 *
 * Si un paramètre `nom` est présent dans l'URL, filtre les artisans
 * par catégorie. Sinon, affiche tous les artisans.
 *
 * @component
 * @returns {JSX.Element} Liste des artisans (avec filtres éventuels)
 */
const Liste = () => {
  const { nom } = useParams(); // Récupération de la catégorie depuis l'URL
  const [artisans, setArtisans] = useState([]); // État pour les artisans récupérés
  const [loading, setLoading] = useState(true); // État pour le chargement

  /**
   * Récupère les artisans depuis l'API.
   * Si `nom` est défini, récupère les artisans de la catégorie correspondante.
   */
  useEffect(() => {
    const fetchArtisans = async () => {
      setLoading(true);
      try {
        const url = nom
          ? `http://localhost:5050/api/artisans/categorie/${nom}`
          : `http://localhost:5050/api/artisans`;

        const response = await fetch(url);
        const data = await response.json();
        setArtisans(data);
      } catch (error) {
        console.error("Erreur :", error);
        setArtisans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, [nom]);

  // Affichage pendant le chargement
  if (loading) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div className="container py-4">
      {/* Titre principal */}
      <h1 className="mb-2 text-center">Liste des Artisans</h1>

      {/* Titre secondaire si catégorie filtrée */}
      {nom && <h2 className="mb-4 text-center">Catégorie : {nom}</h2>}

      {/* Gestion du cas où aucun artisan n'est trouvé */}
      {artisans.length === 0 ? (
        <p className="text-center">Aucun artisan trouvé.</p>
      ) : (
        <div className="row g-3">
          {/* Affichage de chaque artisan via le composant ArtisanCard */}
          {artisans.map((artisan) => (
            <div className="col-12 col-md-4" key={artisan.id_artisan}>
              <ArtisanCard artisan={artisan} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Liste;
