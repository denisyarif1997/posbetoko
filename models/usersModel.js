const pool = require('../config/db');

const Users = {
  getAll: async (options = {}) => {
    const { page = 1, limit = 20, search = '' } = options;
    const offset = (page - 1) * limit;
    const searchCondition = search ? `AND name ILIKE $3` : '';
    const query = `
      SELECT id, name, email, role
      FROM users
      WHERE deleted_at IS NULL
      ${searchCondition}
      ORDER BY name ASC
      LIMIT $1 OFFSET $2`;
    const params = search ? [limit, offset, `%${search}%`] : [limit, offset];
    const result = await pool.query(query, params);
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
  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL', [email]);
    return result.rows[0];
  },
  // Get total count for pagination (optional search)
  getCount: async (search = '') => {
    const searchCondition = search ? `AND name ILIKE $1` : '';
    const query = `
      SELECT COUNT(*) AS total
      FROM users
      WHERE deleted_at IS NULL
      ${searchCondition}`;
    const params = search ? [`%${search}%`] : [];
    const result = await pool.query(query, params);
    return parseInt(result.rows[0].total, 10);
  },
};

module.exports = Users;
