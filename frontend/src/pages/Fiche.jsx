// Page affichant les informations détaillées d'un artisan
// ainsi qu'un formulaire de contact.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtisanById } from "../services/api";
import "../styles/Fiche.scss";

/**
 * Page de fiche artisan.
 *
 * Récupère les informations d'un artisan via son ID
 * et affiche :
 * - ses informations détaillées
 * - un formulaire de contact
 *
 * @component
 * @returns {JSX.Element} Page de fiche artisan
 */
const Fiche = () => {
  const { id } = useParams();

  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    object: "",
    message: "",
  });

  /**
   * Charge les informations de l'artisan depuis l'API.
   */
  useEffect(() => {
    const load = async () => {
      const data = await getArtisanById(id);

      setArtisan(data);
      setLoading(false);
    };

    load();
  }, [id]);

  /**
   * Gère l'envoi du formulaire de contact.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Événement de soumission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      console.log("Formulaire envoyé :", formData);

      alert(`Merci ! Votre message sera transmis à ${artisan.nom}.`);

      setFormData({
        name: "",
        email: "",
        object: "",
        message: "",
      });
    } catch (error) {
      alert("Erreur lors de l'envoi.");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Chargement...</p>;
  }

  if (!artisan) {
    return <p className="text-center mt-5">Artisan introuvable.</p>;
  }

  return (
    <main className="container py-4">
      <h1 className="text-center mb-4">Fiche artisan</h1>

      <section
        className="p-4 rounded"
        style={{
          backgroundColor: "#00497c",
          color: "#fff",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div className="row g-4">
          {/* Informations de l'artisan */}
          <div className="col-12 col-lg-6">
            {artisan.image && (
              <img
                src={artisan.image}
                alt={artisan.nom}
                className="img-fluid rounded mb-4"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            )}

            <h2 className="h4 mb-2 text-center" style={{ color: "#fff" }}>
              {artisan.nom}
            </h2>

            <p className="mb-2" style={{ color: "#fff" }}>
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

            {/* Section A propos */}
            <section
              className="p-3 rounded mb-3"
              style={{ backgroundColor: "#384050" }}
            >
              {/* Version desktop/tablette */}
              <div className="a-propos-desktop">
                <h3 className="h5 pb-2 mb-3" style={{ color: "#fff" }}>
                  A propos...
                </h3>

                <p
                  style={{
                    color: "#fff",
                    lineHeight: "1.6",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {artisan.a_propos}
                </p>
              </div>

              {/* Version mobile déroulante */}
              <div className="a-propos-mobile">
                <details>
                  <summary className="a-propos-summary">
                    <span>A propos...</span>
                    <img
                      src="/img/fleche.svg"
                      alt=""
                      className="a-propos-icon"
                    />
                  </summary>

                  <p
                    style={{
                      color: "#fff",
                      marginTop: "1rem",
                      lineHeight: "1.6",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {artisan.a_propos}
                  </p>
                </details>
              </div>
            </section>
          </div>

          {/* Formulaire de contact */}
          <div className="col-12 col-lg-6">
            <section
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
                />

                <button
                  type="submit"
                  className="btn btn-light w-100"
                  disabled={sending}
                >
                  {sending ? "Envoi en cours..." : "Envoyer le message"}
                </button>
              </form>
            </section>
          </div>
        </div>

        {/* Site web de l'artisan */}
        <section className="text-center mt-4 pt-3">
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
        </section>
      </section>
    </main>
  );
};

export default Fiche;
