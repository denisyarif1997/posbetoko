const Warehouse = require('../models/warehouseModel');
// const verifyToken = require('../middleware/auth');

const WarehousesController = {
  getAll: async (req, res) => {
    try {
      const warehouses = await Warehouse.getAll();
      res.json({ success: true, message: "Warehouses retrieved successfully", data: warehouses });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to retrieve warehouses", error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { name, location } = req.body;
      const warehouse = await Warehouse.create(name, location);
      res.status(201).json({ success: true, message: "Warehouse created successfully", data: warehouse });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to create warehouse", error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, location } = req.body;
      
      const updatedRows = await Warehouse.update(id, name, location);
      
      if (updatedRows) {
        res.json({ success: true, message: "Warehouse updated successfully", data: updatedRows });
      } else {
        res.status(404).json({ success: false, message: "Warehouse not found or no changes made" });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to update warehouse", error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Warehouse.delete(id);
      
      if (deleted) {
        res.json({ success: true, message: "Warehouse deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "Warehouse not found" });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to delete warehouse", error: err.message });
    }
  },
};

module.exports = WarehousesController;
