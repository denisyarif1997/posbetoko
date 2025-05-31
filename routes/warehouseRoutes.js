const express = require('express');
const router = express.Router();
const WarehousesController = require('../controllers/warehouseController');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, WarehousesController.getAll);
router.post('/', verifyToken, WarehousesController.create);
router.put('/:id', verifyToken, WarehousesController.update);
router.delete('/:id', verifyToken, WarehousesController.delete);

module.exports = router;
