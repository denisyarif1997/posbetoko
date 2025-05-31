const express = require('express');
const router = express.Router();
const TransactionsController = require('../controllers/transactionsController');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, TransactionsController.getAll);
router.post('/', verifyToken, TransactionsController.create);

module.exports = router;
