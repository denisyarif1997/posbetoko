const Products = require('../models/productsModel');

const ProductsController = {
  getAll: async (req, res) => {
    try {
      const products = await Products.getAll();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getByNameProduct: async (req, res) => {
    try {
      const { name } = req.params;
      const products = await Products.getByNameProduct(name);
      if (!products.length) {
        return res.status(404).json({ message: 'No products found' });
      }
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  

  create: async (req, res) => {
    try {
      const { name, barcode, category_id, unit_id, price } = req.body;
      const product = await Products.create(name, barcode, category_id, unit_id, price);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, barcode, category_id, unit_id, price } = req.body;
      const product = await Products.update(id, name, barcode, category_id, unit_id, price);
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Products.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = ProductsController;
