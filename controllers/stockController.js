const Stock = require("../models/inputStockModel");

const StockController = {
  create: async (req, res) => {
    try {
      const { product_id, warehouse_id, qty } = req.body;
      const stock = await Stock.create(product_id, warehouse_id, qty);
      res.status(201).json({ success: true, message: "Stock added successfully", data: stock });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to add stock", error: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const stocks = await Stock.getAll();
      res.json({ success: true, message: "Stocks retrieved successfully", data: stocks });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to retrieve stocks", error: err.message });
    }
  },

 update: async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;

    // Proses update stok
    const update_stock = await Stock.update(id, qty);

    // Jika tidak ada hasil update (misalnya ID tidak ditemukan)
    if (!update_stock) {
      return res.status(404).json({ success: false, message: "Stock not found" });
    }

    // Respon sukses jika stok berhasil diperbarui
    res.json({ success: true, message: "Stock adjusted successfully", data: update_stock });
  } catch (err) {
    // Respon jika terjadi error
    res.status(500).json({ success: false, message: "Failed to update stock", error: err.message });
  }
},

  
};

module.exports = StockController;
