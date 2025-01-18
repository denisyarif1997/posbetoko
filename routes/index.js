const express = require('express');
const router = express.Router();

const usersRoutes = require('./usersRoutes');
const productsRoutes = require('./productsRoutes');
const categoriesRoutes = require('./categoriesRoutes');
const transactionsRoutes = require('./transactionsRoutes');
const customersRoutes = require('./customersRoutes');
const suppliersRoutes = require('./suppliersRoutes');

// Register routes
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/transactions', transactionsRoutes);
router.use('/customers', customersRoutes);
router.use('/suppliers', suppliersRoutes);

module.exports = router;
