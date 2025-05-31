const pool = require('../config/db');

const Products = {
  getAll: async () => {
    const result = await pool.query(`SELECT 
p.id as "product id",
p."name" ,
p.barcode ,
c."name" as "category product",
u."name" as "unit product",
wi.qty as "qty total",
p.created_at ,
p.updated_at 
FROM products p  left join
categories c on p.category_id = c.id 
left join units u on p.unit_id = u.id 
left join wp_inventory wi on wi.product_id 
= p.id 
where p.deleted_at is null
`);
    return result.rows;
  },

  getByNameProduct: async (name) => {
    const result = await pool.query(`SELECT 
p.id as "product id",
p."name" ,
p.barcode ,
c."name" as "category product",
u."name" as "unit product",
wi.qty as "qty total",
p.created_at ,
p.updated_at 
FROM products p  left join
categories c on p.category_id = c.id 
left join units u on p.unit_id = u.id 
left join wp_inventory wi on wi.product_id 
= p.id 
where p.deleted_at is null
and p."name" ilike $1
`, [`%${name}%`]);
    return result.rows;
  },
  
  create: async (name, barcode, category_id, unit_id, price) => {
    const result = await pool.query(
      'INSERT INTO products (name, barcode, category_id, unit_id, price ) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, barcode, category_id, unit_id, price]
    );
    return result.rows[0];
  },
  update: async (id, name, barcode, category_id, unit_id, price) => {
    const result = await pool.query(
      'UPDATE products SET name = $1, barcode = $2, category_id = $3, unit_id = $4, price = $5 WHERE id = $6 AND deleted_at IS NULL RETURNING *',
      [name, barcode, category_id, unit_id, price, id]
    );
    return result.rows[0];
  },
  delete: async (id) => {
    await pool.query('UPDATE products SET deleted_at = NOW() WHERE id = $1', [id]);
  },
};

module.exports = Products;
