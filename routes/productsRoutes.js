const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/productsController');
const verifyToken = require('../middleware/auth');


router.get('/',verifyToken, ProductsController.getAll);
router.post('/', verifyToken,ProductsController.create);
router.put('/:id', verifyToken, ProductsController.update);
router.delete('/:id', verifyToken, ProductsController.delete);
router.get('/:name', verifyToken, ProductsController.getByNameProduct);

module.exports = router;
