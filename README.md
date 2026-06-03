# TT Artisan

## Présentation 

📌 **Trouve Ton Artisan** est une plateforme permettant aux utilisateurs de trouver facilement des artisans selon leur catégorie d'activité, de consulter leur fiche détaillée et de les contacter via un formulaire de contact.  

L’application repose sur une architecture frontend / backend :
- un frontend développé avec React
- une API REST développée avec Node.js et Express
- une base de données MySQL gérée avec Sequelize ORM

---

## Déploiement

Frontend : https://tt-artisan-frontend.onrender.com

Backend API : https://tt-artisan.onrender.com

---
## Technologies

### Frontend
- React
- React Router 
- SCSS 
- Bootstrap
- Fetch API 

### Backend
- Node.js 
- Express.js
- Sequelize ORM
- MySQL

### Hébergement
- Render (Frontend / Backend)
- Aiven (base de données MySQL)

---

## Fonctionnalités

- Page d'accueil avec les artisans du mois
- Recherche d'artisans
- Affichage des artisans par catégorie
- Fiche détaillée d'un artisan
- Formulaire de contact
- Navigation responsive
- Gestion des erreurs (page 404)
- API REST avec Sequelize
- CRUD des artisans, catégories et spécialités

---

## Compétences mises en œuvre

- Développement front-end avec React
- Création d’interfaces utilisateur dynamiques
- Développement back-end avec Node.js / Express
- Mise en place d’une API REST
- Gestion d’une base de données relationnelle MySQL
- Utilisation de Sequelize ORM
- Architecture client / serveur
- Gestion du responsive design
- Structuration sémantique HTML5
- Utilisation de Git et GitHub

---

## Installation du projet

### Prérequis
- Node.js
- npm
- MySQL / phpMyAdmin

---

## Installation du frontend

```bash
cd frontend
npm install
npm start
```

Le frontend sera accessible sur : http://localhost:3000

---

## Installation du backend

```bash
cd backend
npm install
npm start
```

Le backend sera accessible sur : http://localhost:5050

---

## Base de données

La base de données MySQL est hébergée sur Aiven.

Les scripts SQL permettant de recréer la base sont disponibles dans le dossier `tta_sql`.

---

## Structure du projet

TT_ARTISAN/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.js
│
├── frontend/
│   ├── build/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│
├── tta_sql/
├── MCD.png
├── MLD.png
└── README.md


