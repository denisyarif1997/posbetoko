const Customers = require('../models/customersModel');

const CustomersController = {
  getAll: async (req, res) => {
    try {
      const customers = await Customers.getAll();
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const { name, phone, email, address } = req.body;
      const customer = await Customers.create(name, phone, email, address);
      res.status(201).json(customer);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phone, email, address } = req.body;
      const customer = await Customers.update(id, name, phone, email, address);
      res.json(customer);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Customers.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = CustomersController;
