const Warehouse = require('../models/warehouseModel');
// const verifyToken = require('../middleware/auth');

const WarehousesController = {
  getAll: async (req, res) => {
    try {
      const warehouse = await Warehouse.getAll();
      res.json(warehouse);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const { name, location } = req.body;
      const warehouse = await Warehouse.create(name, location);
      res.status(201).json(warehouse);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, location } = req.body;
      const warehouse = await Warehouse.update(id, name);
      res.json(warehouse);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Warehouse.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = WarehousesController;
