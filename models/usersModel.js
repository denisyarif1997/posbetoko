const pool = require('../config/db');

const Users = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM users WHERE deleted_at IS NULL');
    return result.rows;
  },
  create: async (name, email, password, role) => {
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, role]
    );
    return result.rows[0];
  },
  update: async (id, name, email, password, role) => {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 AND deleted_at IS NULL RETURNING *',
      [name, email, password, role, id]
    );
    return result.rows[0];
  },
  delete: async (id) => {
    await pool.query('UPDATE users SET deleted_at = NOW() WHERE id = $1', [id]);
  },
};

module.exports = Users;
