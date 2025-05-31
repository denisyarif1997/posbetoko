const pool = require("../config/db");

const Stock = {
  create: async (product_id, warehouse_id, qty) => {
    //cek data apa sudah ada di table

    const chekcResult = await pool.query(
      `SELECT * FROM wp_inventory 
      WHERE product_id = $1 AND warehouse_id = $2`,
      [product_id,warehouse_id]
    );

    //jika data sudah ada kembalikan respon
    if (chekcResult.rows.length > 0) {
      return { success: false, message: "data already exist please adjsut quantity"}
    }

    //jika data belum ada
    const result = await pool.query(
      `INSERT INTO wp_inventory (product_id, warehouse_id, qty, created_at, updated_at) 
       VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *`,
      [product_id, warehouse_id, qty]
    );
    return result.rows[0];
  },

  //adjsut stock
  update: async (id, qty) => {
    const result = await pool.query(
      'UPDATE wp_inventory SET qty = $2 WHERE id = $1 RETURNING *',
      [id,qty]
    );
    return result.rows[0];
  },

  //get stock all
  getAll: async () => {
    const result = await pool.query(`select wi.id ,
p.id as "id product",
p."name" as "product",
w."name" as "gudang",
wi.qty as "quantity",
wi.created_at ,
wi.updated_at 
from public.wp_inventory wi 
left join public.products p on wi.product_id = p.id 
left join public.warehouses w on wi.warehouse_id = w.id 
where p.deleted_at is null
order by wi.id desc limit 100`);
    return result.rows;
  }
};

module.exports = Stock;
