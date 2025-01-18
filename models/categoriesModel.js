const pool = require('../config/db');

const Categories = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM categories WHERE deleted_at IS NULL');
    return result.rows;
  },
  create: async (name, description) => {
    const result = await pool.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    return result.rows[0];
  },
  update: async (id, name, description) => {
    const result = await pool.query(
      'UPDATE categories SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND deleted_at IS NULL RETURNING *',
      [name, description, id]
    );
    return result.rows[0];
  },
  delete: async (id) => {
    await pool.query('UPDATE categories SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1', [id]);
  },
};

module.exports = Categories;
