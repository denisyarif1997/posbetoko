const pool = require('../config/db');

const Customers = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM customers WHERE deleted_at IS NULL');
    return result.rows;
  },
  create: async (name, phone, email, address) => {
    const result = await pool.query(
      'INSERT INTO customers (name, phone, email, address) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, phone, email, address]
    );
    return result.rows[0];
  },
  update: async (id, name, phone, email, address) => {
    const result = await pool.query(
      'UPDATE customers SET name = $1, phone = $2, email = $3, address = $4 WHERE id = $5 AND deleted_at IS NULL RETURNING *',
      [name, phone, email, address, id]
    );
    return result.rows[0];
  },
  delete: async (id) => {
    await pool.query('UPDATE customers SET deleted_at = NOW() WHERE id = $1', [id]);
  },
};

module.exports = Customers;
