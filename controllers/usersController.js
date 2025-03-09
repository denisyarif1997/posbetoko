const Users = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'your_secret_key'; // Ganti dengan kunci rahasia Anda


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

      // Hash password sebelum menyimpannya
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await Users.create(name, email, hashedPassword, role);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password, role } = req.body;

      // Hash password jika ada pembaruan password
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

      const user = await Users.update(id, name, email, hashedPassword, role);
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
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Cari pengguna berdasarkan email
      const user = await Users.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Periksa apakah password cocok
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Buat token JWT
      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '24h' });

      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = UsersController;
