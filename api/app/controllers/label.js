const { Label } = require("../models");

const labelController = {
  // lire toutes les labels
  list: async (req, res) => {
    try {
      const labels = await Label.findAll();

      res.json(labels);
    } catch (error) {
      console.trace(error);
      res.status(500).json({ message: "Erreur" });
    }
  },
  // créer un label
  create: async (req, res) => {
    try {
      // gérer les champs obligatoire
      if (!req.body.title) {
        throw new Error("title obligatoire");
      }
      const newLabel = await Label.create({
        title: req.body.title,
        color: req.body.color,
      });

      res.json(newLabel);
    } catch (error) {
      console.trace(error);
      res.status(500).json({ message: "Erreur" });
    }
  },
  // lire un label
  read: async (req, res) => {
    try {
      const id = req.params.id;
      const label = await Label.findByPk(id);

      if (label) {
        res.json(label);
      } else {
        res.status(404).json(`Aucun label à l'id ${id}`);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json({ message: "Erreur" });
    }
  },
  // mettre à jour un label
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const label = await Label.findByPk(id);

      if (label) {
        // mettre à jour le label avec les infos passées
        if (req.body.title) {
          label.title = req.body.title;
        }
        if (req.body.color) {
          label.color = req.body.color;
        }

        const labelSaved = await label.save();
        res.json(labelSaved);
      } else {
        res.status(404).json(`Aucun label à l'id ${id}`);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json({ message: "Erreur" });
    }
  },
  // supprimer un label
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const label = await Label.findByPk(id);

      if (label) {
        await label.destroy();
        res.json("Label supprimé");
      } else {
        res.status(404).json(`Aucun label à l'id ${id}`);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json({ message: "Erreur" });
    }
  },
  createOrUpdate: async (req, res) => {
    try {
      let label;
      if (req.params.id) {
        label = await Label.findByPk(req.params.id);
      }
      if (label) {
        await labelController.update(req, res);
      } else {
        await labelController.create(req, res);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = labelController;
