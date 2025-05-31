const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, stockController.getAll);
router.post('/', verifyToken, stockController.create);
router.put('/:id', verifyToken, stockController.update);
router.delete('/:id', verifyToken, stockController.delete);

module.exports = router;
