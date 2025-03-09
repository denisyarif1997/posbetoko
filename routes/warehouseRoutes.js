const express = require('express');
const router = express.Router();
const WarehousesController = require('../controllers/warehouseController');
// const verifyToken = require('../middleware/auth');

router.get('/', WarehousesController.getAll);
router.post('/', WarehousesController.create);
router.put('/:id', WarehousesController.update);
router.delete('/:id', WarehousesController.delete);

module.exports = router;
