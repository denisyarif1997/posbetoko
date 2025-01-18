const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');

router.get('/', UsersController.getAll);
router.post('/', UsersController.create);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.delete);

module.exports = router;
