const db = require('../models');
const Specialite = db.Specialite;
const Categorie = db.Categorie;

// Récupérer toutes les spécialités avec leur catégorie
exports.getAllSpecialites = async (req, res) => {
  try {
    const specialites = await Specialite.findAll();

    // Ajouter la catégorie pour chaque spécialité
    const specialitesWithCategorie = await Promise.all(
      specialites.map(async spec => {
        const categorie = await Categorie.findByPk(spec.id_categorie);
        return { ...spec.toJSON(), categorie };
      })
    );

    res.status(200).json(specialitesWithCategorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer une spécialité par ID avec sa catégorie
exports.getSpecialiteById = async (req, res) => {
  try {
    const specialite = await Specialite.findByPk(req.params.id);

    if (!specialite) {
      return res.status(404).json({ message: "Spécialité non trouvée" });
    }

    const categorie = await Categorie.findByPk(specialite.id_categorie);
    res.status(200).json({ ...specialite.toJSON(), categorie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Créer une spécialité
exports.createSpecialite = async (req, res) => {
  try {
    const newSpecialite = await Specialite.create(req.body);
    res.status(201).json(newSpecialite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de créer la spécialité" });
  }
};

// Mettre à jour une spécialité
exports.updateSpecialite = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Specialite.update(req.body, { where: { id_specialite: id } });
    if (!updated) return res.status(404).json({ message: "Spécialité non trouvée" });

    const updatedSpecialite = await Specialite.findByPk(id);
    res.status(200).json(updatedSpecialite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de mettre à jour la spécialité" });
  }
};

// Supprimer une spécialité
exports.deleteSpecialite = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Specialite.destroy({ where: { id_specialite: id } });
    if (!deleted) return res.status(404).json({ message: "Spécialité non trouvée" });

    res.status(200).json({ message: "Spécialité supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Impossible de supprimer la spécialité" });
  }
};
