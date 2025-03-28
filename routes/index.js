const express = require('express');
const router = express.Router();

const usersRoutes = require('./usersRoutes');
const productsRoutes = require('./productsRoutes');
const categoriesRoutes = require('./categoriesRoutes');
const transactionsRoutes = require('./transactionsRoutes');
const customersRoutes = require('./customersRoutes');
const suppliersRoutes = require('./suppliersRoutes');
const warehousesRoutes = require('./warehouseRoutes');
const stockRoutes = require('./stockRoutes')


// Register routes
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/transactions', transactionsRoutes);
router.use('/customers', customersRoutes);
router.use('/suppliers', suppliersRoutes);
router.use('/warehouse', warehousesRoutes);
router.use('/stock', stockRoutes);


module.exports = router;
