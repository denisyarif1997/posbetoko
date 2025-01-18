const Categories = require('../models/categoriesModel');

const CategoriesController = {
  getAll: async (req, res) => {
    try {
      const categories = await Categories.getAll();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const { name, description } = req.body;
      const category = await Categories.create(name, description);
      res.status(201).json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const category = await Categories.update(id, name, description);
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Categories.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = CategoriesController;
