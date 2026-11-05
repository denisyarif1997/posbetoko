const pool = require('../config/db');

const Categories = {
  getAll: async (options = {}) => {
    const { page = 1, limit = 20, search = '' } = options;
    const offset = (page - 1) * limit;
    const searchCondition = search ? `AND name ILIKE $3` : '';
    const query = `
      SELECT 
        id,
        name, 
        description,
        created_at,
        updated_at
      FROM categories 
      WHERE deleted_at IS NULL
      ${searchCondition}
      ORDER BY name ASC
      LIMIT $1 OFFSET $2`;
    const params = search ? [limit, offset, `%${search}%`] : [limit, offset];
    const result = await pool.query(query, params);
    return result.rows;
  },

  // Get total count for pagination (including optional search)
  getCount: async (search = '') => {
    const searchCondition = search ? `AND name ILIKE $1` : '';
    const query = `
      SELECT COUNT(*) AS total
      FROM categories
      WHERE deleted_at IS NULL
      ${searchCondition}`;
    const params = search ? [`%${search}%`] : [];
    const result = await pool.query(query, params);
    return parseInt(result.rows[0].total, 10);
  },

  create: async (name, description) => {
    const query = `
      INSERT INTO categories (
        name, 
        description
      ) VALUES ($1, $2) 
      RETURNING 
        id,
        name,
        description,
        created_at,
        updated_at`;
    const result = await pool.query(query, [name, description]);
    return result.rows[0];
  },

  update: async (id, name, description) => {
    const query = `
      UPDATE categories 
      SET 
        name = $1,
        description = $2,
        updated_at = CURRENT_TIMESTAMP 
      WHERE id = $3 
        AND deleted_at IS NULL
      RETURNING 
        id,
        name,
        description,
        created_at,
        updated_at`;
    const result = await pool.query(query, [name, description, id]);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = 'UPDATE categories SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1';
    await pool.query(query, [id]);
  },

  getById: async (id) => {
    const query = `
      SELECT
        id,
        name,
        description,
        created_at,
        updated_at
      FROM categories
      WHERE id = $1
        AND deleted_at IS NULL`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};

module.exports = Categories;
