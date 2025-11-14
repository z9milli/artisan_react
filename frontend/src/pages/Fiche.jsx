import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtisanById } from "../services/api";

/**
 * Page de fiche d'un artisan.
 *
 * Affiche les informations détaillées d'un artisan et un formulaire de contact.
 * Récupère l'artisan via son ID depuis l'API.
 *
 * @component
 * @returns {JSX.Element} Page de fiche artisan complète
 */
const Fiche = () => {
  const { id } = useParams(); // Récupération de l'ID depuis l'URL
  const [artisan, setArtisan] = useState(null); // État pour l'artisan
  const [loading, setLoading] = useState(true); // État de chargement
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    object: "",
    message: "",
  }); // État pour le formulaire de contact
  const [sending, setSending] = useState(false); // État pour le bouton d'envoi

  // Chargement de l'artisan depuis l'API au montage du composant
  useEffect(() => {
    const load = async () => {
      const data = await getArtisanById(id);
      setArtisan(data);
      setLoading(false);
    };
    load();
  }, [id]);

  /**
   * Gestion de l'envoi du formulaire de contact.
   * @param {React.FormEvent<HTMLFormElement>} e - Événement de soumission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      // Ici on appellerait l'API pour envoyer le message
      console.log("Formulaire envoyé :", formData);
      alert(`Merci ! Votre message sera transmis à ${artisan.nom}.`);
      setFormData({ name: "", email: "", object: "", message: "" });
    } catch (error) {
      alert("Erreur lors de l'envoi.");
    } finally {
      setSending(false);
    }
  };

  // Affichage pendant le chargement
  if (loading) return <p className="text-center mt-5">Chargement...</p>;
  if (!artisan) return <p className="text-center mt-5">Artisan introuvable.</p>;

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Fiche artisan</h1>

      <div
        className="p-4 rounded"
        style={{
          backgroundColor: "#00497c",
          color: "#fff",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div className="row g-4">
          {/* Colonne gauche : Informations de l'artisan */}
          <div className="col-12 col-lg-6">
            {/* Image de l'artisan */}
            {artisan.image && (
              <img
                src={artisan.image}
                alt={artisan.nom}
                className="img-fluid rounded mb-4"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            )}

            {/* Nom, spécialité, note et ville */}
            <h2 className="h4 mb-2 text-center" style={{ color: "#fff" }}>
              {artisan.nom}
            </h2>
            <p className="fw-bold mb-1" style={{ color: "#fff" }}>
              {artisan.specialite?.nom ||
                artisan.specialite?.nom_specialite ||
                "Spécialité"}
            </p>
            <p className="mb-2" style={{ color: "#fff" }}>
              {artisan.note} {"⭐".repeat(artisan.note)}
            </p>
            <p className="mb-4" style={{ color: "#fff" }}>
              {artisan.ville}
            </p>

            {/* Section "À propos" */}
            <div
              className="p-3 rounded mb-3"
              style={{ backgroundColor: "#384050" }}
            >
              <h3 className="h5 pb-2 mb-3" style={{ color: "#fff" }}>
                A Propos
              </h3>
              <p
                style={{
                  color: "#fff",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                }}
              >
                {artisan.a_propos ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin."}
              </p>
            </div>
          </div>

          {/* Colonne droite : Formulaire de contact */}
          <div className="col-12 col-lg-6">
            <div
              className="p-4 rounded h-100"
              style={{ backgroundColor: "#f1f8fc" }}
            >
              <h3 className="text-center mb-4" style={{ color: "#00497c" }}>
                Formulaire de contact
              </h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Nom..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email..."
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Objet..."
                  value={formData.object}
                  onChange={(e) =>
                    setFormData({ ...formData, object: e.target.value })
                  }
                  required
                />
                <textarea
                  className="form-control mb-4"
                  rows="6"
                  placeholder="Message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                ></textarea>
                <button
                  type="submit"
                  className="btn btn-light w-100"
                  disabled={sending}
                >
                  {sending ? "Envoi en cours..." : "Envoyer le message"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Lien vers le site web de l'artisan */}
        <div
          className="text-center mt-4 pt-3"
          style={{ borderColor: "rgba(255,255,255,0.3)" }}
        >
          {artisan.site_web ? (
            <a
              href={artisan.site_web}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              {artisan.site_web}
            </a>
          ) : (
            <span style={{ opacity: 0.6, color: "#fff" }}>Aucun site web</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fiche;
