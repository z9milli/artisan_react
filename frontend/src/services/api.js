const API_URL = "http://localhost:5050/api";

// Récupérer les 3 artisans du mois
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

// Récupérer toutes les catégories
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

// Récupérer tous les artisans
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

// Récupérer les artisans par catégorie (par nom)
export async function getArtisansByCategorie(categorieNom) {
  try {
    const response = await fetch(`${API_URL}/artisans/categorie/${categorieNom}`);
    if (!response.ok) throw new Error("Erreur fetch API");
    const data = await response.json();
    console.log(`Artisans de la catégorie ${categorieNom} :`, data);
    return data;
  } catch (error) {
    console.error(`Erreur getArtisansByCategorie (${categorieNom}) :`, error);
    return [];
  }
}

// Récupérer un artisan par son ID
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

// Rechercher des artisans par nom
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

// Envoyer un formulaire de contact
export async function sendContactForm(formData) {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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


