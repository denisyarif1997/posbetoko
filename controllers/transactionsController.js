const Transactions = require('../models/transactionsModel');

const TransactionsController = {
  getAll: async (req, res) => {
    try {
      const transactions = await Transactions.getAll();
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const { user_id, customer_id, total, payment, change, details } = req.body;
      const transaction = await Transactions.create(user_id, customer_id, total, payment, change, details);
      res.status(201).json(transaction);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = TransactionsController;
