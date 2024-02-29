const express = require('express');
const historyRouter = express.Router();
const authenticate = require('../middleware/auth');
const { donorRequest, patientRequest, getRequestsHistory, getDonationsHistory, dashboardStats } = require('../controllers/historyController');

// user authenticatin is required for all routes
historyRouter.use(authenticate);

// history routes
historyRouter.post('/donor/:type',  donorRequest);
historyRouter.post('/patient/request',  patientRequest);
historyRouter.get('/requests/:id',  getRequestsHistory);
historyRouter.get('/donations/:id', getDonationsHistory);

// dashboard history routes
historyRouter.get('/dashboard-stats', dashboardStats);

module.exports = historyRouter;