const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
// const verifyToken = require('../middleware/auth');

router.get('/', stockController.getAll);
router.post('/', stockController.create);
router.put('/:id', stockController.update);
// router.delete('/:id', WarehousesController.delete);

module.exports = router;
