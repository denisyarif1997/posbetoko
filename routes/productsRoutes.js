const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/productsController');

router.get('/', ProductsController.getAll);
router.post('/', ProductsController.create);
router.put('/:id', ProductsController.update);
router.delete('/:id', ProductsController.delete);

module.exports = router;
