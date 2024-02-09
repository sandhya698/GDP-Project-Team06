const express = require('express');
const inventoryRouter = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { manageStock, getStock, miscStats } = require('../controllers/inventoryController');

// inventory routes
inventoryRouter.post('/manage-stock/:type', adminAuth, manageStock);
inventoryRouter.get('/get-stock', adminAuth, getStock);
inventoryRouter.get('/misc-stats', adminAuth, miscStats);

module.exports = inventoryRouter;