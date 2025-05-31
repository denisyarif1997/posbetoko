const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');
const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, UsersController.getAll);
router.post('/', verifyToken, UsersController.create);
router.put('/:id', verifyToken, UsersController.update);
router.delete('/:id', verifyToken, UsersController.delete);
router.post('/login', UsersController.login); // Route untuk login

module.exports = router;
