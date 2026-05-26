const API_URL = "http://localhost:5050/api";

/**
 * Récupère les trois artisans du mois.
 * @async
 * @returns {Promise<Array>} Liste des artisans du mois
 */
export async function getArtisansDuMois() {
  try {
    const response = await fetch(`${API_URL}/artisans/mois`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des artisans du mois");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur getArtisansDuMois :", error);
    return [];
  }
}

/**
 * Récupère toutes les catégories.
 * @async
 * @returns {Promise<Array>} Liste des catégories
 */
export async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des catégories");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur getCategories :", error);
    return [];
  }
}

/**
 * Récupère tous les artisans.
 * @async
 * @returns {Promise<Array>} Liste de tous les artisans
 */
export async function getArtisans() {
  try {
    const response = await fetch(`${API_URL}/artisans`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des artisans");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur getArtisans :", error);
    return [];
  }
}

/**
 * Récupère les artisans correspondant à une catégorie donnée.
 * @async
 * @param {string} categorieNom - Nom de la catégorie
 * @returns {Promise<Array>} Liste des artisans de la catégorie
 */
export async function getArtisansByCategorie(categorieNom) {
  try {
    const response = await fetch(
      `${API_URL}/artisans/categorie/${encodeURIComponent(categorieNom)}`,
    );

    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des artisans par catégorie",
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Erreur getArtisansByCategorie (${categorieNom}) :`, error);
    return [];
  }
}

/**
 * Récupère un artisan grâce à son ID.
 * @async
 * @param {number|string} id - ID de l'artisan
 * @returns {Promise<Object|null>} Artisan trouvé ou null en cas d'erreur
 */
export async function getArtisanById(id) {
  try {
    const response = await fetch(`${API_URL}/artisans/${id}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de l'artisan");
    }

    return await response.json();
  } catch (error) {
    console.error(`Erreur getArtisanById (${id}) :`, error);
    return null;
  }
}

/**
 * Recherche des artisans par nom, ville ou spécialité.
 * @async
 * @param {string} query - Texte saisi dans la barre de recherche
 * @returns {Promise<Array>} Liste des artisans correspondant à la recherche
 */
export async function searchArtisans(query) {
  try {
    const response = await fetch(
      `${API_URL}/artisans/search?q=${encodeURIComponent(query)}`,
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la recherche des artisans");
    }

    return await response.json();
  } catch (error) {
    console.error(`Erreur searchArtisans (${query}) :`, error);
    return [];
  }
}

/**
 * Envoie les données du formulaire de contact au serveur.
 * @async
 * @param {Object} formData - Données du formulaire de contact
 * @param {string} formData.name - Nom de l'utilisateur
 * @param {string} formData.email - Email de l'utilisateur
 * @param {string} formData.object - Objet du message
 * @param {string} formData.message - Message envoyé
 * @returns {Promise<Object>} Réponse du serveur
 * @throws {Error} En cas d'échec de l'envoi
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

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi du formulaire");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur sendContactForm :", error);
    throw error;
  }
}
