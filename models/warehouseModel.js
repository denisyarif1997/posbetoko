const pool = require('../config/db');

const Warehouse = {
  getAll: async () => {
    const result = await pool.query('select id,"name" as "nama gudang","location" as "lokasi",created_at ,updated_at from public.warehouses w ');
    return result.rows;
  },
  create: async (name, location) => {
    const result = await pool.query(
      'INSERT INTO warehouses (name, location) VALUES ($1, $2) RETURNING *',
      [name, location]
    );
    return result.rows[0];
  },
  update: async (id, name,location) => {
    const result = await pool.query(
      'UPDATE customers SET name = $1, location = $2, email = $3, address = $4 WHERE id = $5 AND deleted_at IS NULL RETURNING *',
      [name, phone, email, address, id]
    );
    return result.rows[0];
  },
//   delete: async (id) => {
//     await pool.query('UPDATE customers SET deleted_at = NOW() WHERE id = $1', [id]);
//   },
};

module.exports = Warehouse;
