import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ArtisanCard from "../components/ArtisanCard";

/**
 * Page affichant la liste des artisans.
 *
 * Si un paramètre `nom` est présent dans l'URL, filtre les artisans
 * par catégorie.
 * Si une query string `q` est présente, affiche les résultats de recherche.
 *
 * @component
 * @returns {JSX.Element} Liste des artisans
 */
const Liste = () => {
  const { nom } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtisans = async () => {
      setLoading(true);

      try {
        let url = "http://localhost:5050/api/artisans";

        if (nom) {
          url = `http://localhost:5050/api/artisans/categorie/${nom}`;
        }

        if (query) {
          url = `http://localhost:5050/api/artisans/search?q=${encodeURIComponent(
            query
          )}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data)) {
          setArtisans(data);
        } else {
          console.error("Réponse API inattendue :", data);
          setArtisans([]);
        }
      } catch (error) {
        console.error("Erreur :", error);
        setArtisans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, [nom, query]);

  if (loading) {
    return <p className="text-center mt-5">Chargement...</p>;
  }

  return (
    <main className="container py-4">
      <h1 className="mb-2 text-center">Liste des Artisans</h1>

      {nom && <h2 className="mb-4 text-center">Catégorie : {nom}</h2>}

      {query && <h2 className="mb-4 text-center">Recherche : {query}</h2>}

      {artisans.length === 0 ? (
        <p className="text-center">Aucun artisan trouvé.</p>
      ) : (
        <section className="row g-3">
          {artisans.map((artisan) => (
            <div className="col-12 col-md-4" key={artisan.id_artisan}>
              <ArtisanCard artisan={artisan} />
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Liste;