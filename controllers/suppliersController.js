const Suppliers = require('../models/suppliersModel');

const SuppliersController = {
  getAll: async (req, res) => {
    try {
      const suppliers = await Suppliers.getAll();
      res.json(suppliers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const { name, phone, email, address } = req.body;
      const supplier = await Suppliers.create(name, phone, email, address);
      res.status(201).json(supplier);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phone, email, address } = req.body;
      const supplier = await Suppliers.update(id, name, phone, email, address);
      res.json(supplier);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Suppliers.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = SuppliersController;
