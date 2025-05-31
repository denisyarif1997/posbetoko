const express = require('express');
const router = express.Router();
const CustomersController = require('../controllers/customersController');
const verifyToken = require('../middleware/auth');


router.get('/', verifyToken, CustomersController.getAll);
router.post('/', verifyToken, CustomersController.create);
router.put('/:id', verifyToken, CustomersController.update);
router.delete('/:id', verifyToken, CustomersController.delete);

module.exports = router;
