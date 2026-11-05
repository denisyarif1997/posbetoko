const pool = require('../config/db');

const Products = {
  getAll: async (options = {}) => {
    const { page = 1, limit = 20, search = '' } = options;
    const offset = (page - 1) * limit;
    const searchCondition = search ? `AND p.name ILIKE $3` : '';
    const query = `
      SELECT 
        p.id as "product_id",
        p.name,
        p.barcode,
        p.price,
        c.name as "category_name",
        u.name as "unit_name", 
        COALESCE(wi.qty, 0) as "stock_quantity",
        p.created_at,
        p.updated_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN units u ON p.unit_id = u.id
      LEFT JOIN wp_inventory wi ON wi.product_id = p.id
      WHERE p.deleted_at IS NULL
      ${searchCondition}
      ORDER BY p.name ASC
      LIMIT $1 OFFSET $2`;

    const params = search ? [limit, offset, `%${search}%`] : [limit, offset];
    const result = await pool.query(query, params);
    return result.rows;
  },

  getByNameProduct: async (name) => {
    const query = `
      SELECT 
        p.id as "product_id",
        p.name,
        p.barcode,
        p.price,
        c.name as "category_name",
        u.name as "unit_name",
        COALESCE(wi.qty, 0) as "stock_quantity",
        p.created_at,
        p.updated_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN units u ON p.unit_id = u.id
      LEFT JOIN wp_inventory wi ON wi.product_id = p.id
      WHERE p.deleted_at IS NULL
        AND p.name ILIKE $1
      ORDER BY p.name ASC`;

    const result = await pool.query(query, [`%${name}%`]);
    return result.rows;
  },

  // Get total count for pagination (optional search)
  getCount: async (search = '') => {
    const searchCondition = search ? `AND name ILIKE $1` : '';
    const query = `
      SELECT COUNT(*) AS total
      FROM products
      WHERE deleted_at IS NULL
      ${searchCondition}`;
    const params = search ? [`%${search}%`] : [];
    const result = await pool.query(query, params);
    return parseInt(result.rows[0].total, 10);
  },

  update: async (id, name, barcode, category_id, unit_id, price) => {
    const query = `
      UPDATE products 
      SET 
        name = $1,
        barcode = $2,
        category_id = $3,
        unit_id = $4,
        price = $5,
        updated_at = NOW()
      WHERE id = $6 
        AND deleted_at IS NULL 
      RETURNING *`;

    const result = await pool.query(query, [
      name,
      barcode,
      category_id,
      unit_id,
      price,
      id
    ]);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = `
      UPDATE products 
      SET 
        deleted_at = NOW(),
        updated_at = NOW()
      WHERE id = $1`;
      
    await pool.query(query, [id]);
  }
};

module.exports = Products;
