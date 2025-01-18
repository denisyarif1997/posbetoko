const Users = require('../models/usersModel');

const UsersController = {
  getAll: async (req, res) => {
    try {
      const users = await Users.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const user = await Users.create(name, email, password, role);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password, role } = req.body;
      const user = await Users.update(id, name, email, password, role);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Users.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = UsersController;
