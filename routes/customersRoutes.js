const express = require('express');
const router = express.Router();
const CustomersController = require('../controllers/customersController');

router.get('/', CustomersController.getAll);
router.post('/', CustomersController.create);
router.put('/:id', CustomersController.update);
router.delete('/:id', CustomersController.delete);

module.exports = router;
