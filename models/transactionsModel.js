const pool = require('../config/db');

const Transactions = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM transactions WHERE deleted_at IS NULL');
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
        await client.query(
          'INSERT INTO transaction_details (transaction_id, product_id, quantity, price, subtotal) VALUES ($1, $2, $3, $4, $5)',
          [transactionId, product_id, quantity, price, subtotal]
        );
        await client.query(
          'UPDATE products SET stock = stock - $1 WHERE id = $2',
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
