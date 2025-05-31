const express = require('express');
const router = express.Router();
const SuppliersController = require('../controllers/suppliersController');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, SuppliersController.getAll);
router.post('/', verifyToken, SuppliersController.create);
router.put('/:id', verifyToken, SuppliersController.update);
router.delete('/:id', verifyToken, SuppliersController.delete);

module.exports = router;
