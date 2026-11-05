const Categories = require('../models/categoriesModel');

const CategoriesController = {
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const search = req.query.search || '';
      const categories = await Categories.getAll({ page, limit, search });
      const total = await Categories.getCount(search);
      res.json({ data: categories, total, page, limit });
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
