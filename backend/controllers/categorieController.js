const db = require('../models');
const Categorie = db.Categorie;

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer une catégorie par ID
exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) return res.status(404).json({ message: "Catégorie non trouvée" });
    res.status(200).json(categorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Créer une catégorie
exports.createCategorie = async (req, res) => {
  try {
    const newCategorie = await Categorie.create(req.body);
    res.status(201).json(newCategorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de créer la catégorie" });
  }
};

// Mettre à jour une catégorie
exports.updateCategorie = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Categorie.update(req.body, { where: { id_categorie: id } });
    if (!updated) return res.status(404).json({ message: "Catégorie non trouvée" });

    const updatedCategorie = await Categorie.findByPk(id);
    res.status(200).json(updatedCategorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de mettre à jour la catégorie" });
  }
};

// Supprimer une catégorie
exports.deleteCategorie = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Categorie.destroy({ where: { id_categorie: id } });
    if (!deleted) return res.status(404).json({ message: "Catégorie non trouvée" });

    res.status(200).json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de supprimer la catégorie" });
  }
};

