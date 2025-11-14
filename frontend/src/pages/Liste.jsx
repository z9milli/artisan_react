import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtisanCard from '../components/ArtisanCard'; 

const Liste = () => {
  const { nom } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div className="container py-4">
      <h1 className="mb-2 text-center">Liste des Artisans</h1>
      {nom && <h2 className="mb-4 text-center">Catégorie : {nom}</h2>}
      
      {artisans.length === 0 ? (
        <p className="text-center">Aucun artisan trouvé.</p>
      ) : (
        <div className="row g-3">
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