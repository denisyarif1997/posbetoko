const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categoriesController');
const verifyToken = require('../middleware/auth');


router.get('/',verifyToken, CategoriesController.getAll);
router.post('/',verifyToken,CategoriesController.create);
router.put('/:id',verifyToken, CategoriesController.update);
router.delete('/:id',verifyToken, CategoriesController.delete);

module.exports = router;
