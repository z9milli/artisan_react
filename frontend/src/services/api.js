const API_URL = "http://localhost:5050/api";

/**
 * Récupère les 3 artisans du mois.
 * @async
 * @returns {Promise<Array>} Tableau des artisans du mois.
 */
export async function getArtisansDuMois() {
  try {
    const response = await fetch(`${API_URL}/artisans/mois`);
    if (!response.ok) throw new Error("Erreur fetch API");
    const data = await response.json();
    console.log("Artisans du mois reçus :", data);
    return data;
  } catch (error) {
    console.error("Erreur getArtisansDuMois :", error);
    return [];
  }
}

/**
 * Récupère toutes les catégories.
 * @async
 * @returns {Promise<Array>} Tableau des catégories.
 */
export async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error("Erreur fetch API");
    const data = await response.json();
    console.log("Catégories reçues :", data);
    return data;
  } catch (error) {
    console.error("Erreur getCategories :", error);
    return [];
  }
}

/**
 * Récupère tous les artisans.
 * @async
 * @returns {Promise<Array>} Tableau de tous les artisans.
 */
export async function getArtisans() {
  try {
    const response = await fetch(`${API_URL}/artisans`);
    if (!response.ok) throw new Error("Erreur fetch API");
    const data = await response.json();
    console.log("Artisans reçus :", data);
    return data;
  } catch (error) {
    console.error("Erreur getArtisans :", error);
    return [];
  }
}

/**
 * Récupère les artisans correspondant à une catégorie donnée.
 * @async
 * @param {string} categorieNom - Nom de la catégorie
 * @returns {Promise<Array>} Tableau des artisans de la catégorie.
 */
export async function getArtisansByCategorie(categorieNom) {
  try {
    const response = await fetch(
      `${API_URL}/artisans/categorie/${categorieNom}`
    );
    if (!response.ok) throw new Error("Erreur fetch API");
    const data = await response.json();
    console.log(`Artisans de la catégorie ${categorieNom} :`, data);
    return data;
  } catch (error) {
    console.error(`Erreur getArtisansByCategorie (${categorieNom}) :`, error);
    return [];
  }
}

/**
 * Récupère un artisan par son ID.
 * @async
 * @param {number|string} id - ID de l'artisan
 * @returns {Promise<Object|null>} Artisan ou null si non trouvé.
 */
export async function getArtisanById(id) {
  try {
    const response = await fetch(`${API_URL}/artisans/${id}`);
    if (!response.ok) throw new Error("Erreur fetch API");
    const data = await response.json();
    console.log("Artisan reçu :", data);
    return data;
  } catch (error) {
    console.error(`Erreur getArtisanById (${id}) :`, error);
    return null;
  }
}

/**
 * Recherche des artisans par nom.
 * @async
 * @param {string} query - Texte de recherche
 * @returns {Promise<Array>} Tableau des artisans correspondant à la recherche.
 */
export async function searchArtisans(query) {
  try {
    const response = await fetch(`${API_URL}/artisans/search?q=${query}`);
    if (!response.ok) throw new Error("Erreur fetch API");
    const data = await response.json();
    console.log(`Résultats de recherche pour "${query}" :`, data);
    return data;
  } catch (error) {
    console.error(`Erreur searchArtisans (${query}) :`, error);
    return [];
  }
}

/**
 * Envoie un formulaire de contact au serveur.
 * @async
 * @param {Object} formData - Données du formulaire {name, email, object, message}
 * @returns {Promise<Object>} Réponse du serveur
 * @throws {Error} En cas d'erreur d'envoi
 */
export async function sendContactForm(formData) {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("Erreur lors de l'envoi du formulaire");
    const data = await response.json();
    console.log("Formulaire envoyé :", data);
    return data;
  } catch (error) {
    console.error("Erreur sendContactForm :", error);
    throw error;
  }
}
