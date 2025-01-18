const pool = require('../config/db');

const Products = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM products WHERE deleted_at IS NULL');
    return result.rows;
  },
  create: async (name, barcode, category_id, unit_id, price, stock) => {
    const result = await pool.query(
      'INSERT INTO products (name, barcode, category_id, unit_id, price, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, barcode, category_id, unit_id, price, stock]
    );
    return result.rows[0];
  },
  update: async (id, name, barcode, category_id, unit_id, price, stock) => {
    const result = await pool.query(
      'UPDATE products SET name = $1, barcode = $2, category_id = $3, unit_id = $4, price = $5, stock = $6 WHERE id = $7 AND deleted_at IS NULL RETURNING *',
      [name, barcode, category_id, unit_id, price, stock, id]
    );
    return result.rows[0];
  },
  delete: async (id) => {
    await pool.query('UPDATE products SET deleted_at = NOW() WHERE id = $1', [id]);
  },
};

module.exports = Products;
