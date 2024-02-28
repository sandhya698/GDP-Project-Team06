const express = require('express');
const historyRouter = express.Router();
const authenticate = require('../middleware/auth');
const { donorRequest, patientRequest, getRequestsHistory } = require('../controllers/historyController');

// history routes
historyRouter.post('/donor/:type', authenticate, donorRequest);
historyRouter.post('/patient/request', authenticate, patientRequest);
historyRouter.get('/requests/:id', authenticate, getRequestsHistory);

module.exports = historyRouter;