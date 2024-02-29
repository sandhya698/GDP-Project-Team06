const express = require('express');
const inventoryRouter = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { manageStock, getStock, miscStats } = require('../controllers/inventoryController');

// admin auth is required for all routes
inventoryRouter.use(adminAuth);

// inventory routes
inventoryRouter.post('/manage-stock/:type', manageStock);
inventoryRouter.get('/get-stock', getStock);
inventoryRouter.get('/misc-stats', miscStats);

module.exports = inventoryRouter;