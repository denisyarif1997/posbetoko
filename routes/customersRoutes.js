const express = require('express');
const router = express.Router();
const CustomersController = require('../controllers/customersController');
// const verifyToken = require('../middleware/auth');


router.get('/', CustomersController.getAll);
router.post('/', CustomersController.create);
router.put('/:id', CustomersController.update);
router.delete('/:id', CustomersController.delete);

module.exports = router;
