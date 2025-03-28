const pool = require('../config/db');

const Transactions = {
  getAll: async () => {
    const result = await pool.query(`
      SELECT t.id, u.name AS "cashier name", c.name AS "customer name", p.name AS "nama barang", td.quantity AS "jumlah item", 
             t.total, t.payment AS "pembayaran", t.change AS "kembalian", 
             t.transaction_date AS "tanggal transaksi", t.created_at 
      FROM transactions t 
      LEFT JOIN public.users u ON t.user_id = u.id 
      LEFT JOIN public.customers c ON c.id = t.customer_id 
      LEFT JOIN public.transaction_details td ON td.transaction_id = t.id 
      LEFT JOIN public.products p ON td.product_id = p.id 
      WHERE t.deleted_at IS NULL 
      ORDER BY t.id DESC
    `);
    return result.rows;
  },

  create: async (user_id, customer_id, total, payment, change, details) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const transactionResult = await client.query(
        'INSERT INTO transactions (user_id, customer_id, total, payment, change) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [user_id, customer_id, total, payment, change]
      );
      const transactionId = transactionResult.rows[0].id;

      for (const detail of details) {
        const { product_id, quantity, price } = detail;
        const subtotal = quantity * price;

        // Cek ketersediaan stok dari tabel wp_inventory
        const stockResult = await client.query(
          'SELECT qty FROM wp_inventory WHERE product_id = $1',
          [product_id]
        );

        if (stockResult.rows.length === 0 || stockResult.rows[0].qty < quantity) {
          throw new Error(`Stok produk ID ${product_id} tidak mencukupi.`);
        }

        // Masukkan transaksi ke dalam tabel transaction_details
        await client.query(
          'INSERT INTO transaction_details (transaction_id, product_id, quantity, price, subtotal) VALUES ($1, $2, $3, $4, $5)',
          [transactionId, product_id, quantity, price, subtotal]
        );

        // Kurangi stok di tabel wp_inventory
        await client.query(
          'UPDATE wp_inventory SET qty = qty - $1 WHERE product_id = $2',
          [quantity, product_id]
        );
      }

      await client.query('COMMIT');
      return transactionResult.rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },
};

module.exports = Transactions;
