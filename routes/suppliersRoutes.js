const express = require('express');
const router = express.Router();
const SuppliersController = require('../controllers/suppliersController');

router.get('/', SuppliersController.getAll);
router.post('/', SuppliersController.create);
router.put('/:id', SuppliersController.update);
router.delete('/:id', SuppliersController.delete);

module.exports = router;
