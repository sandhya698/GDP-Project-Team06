const express = require('express');
const historyRouter = express.Router();
const authenticate = require('../middleware/auth');
const { donorRequest, patientRequest } = require('../controllers/historyController');

// history routes
historyRouter.post('/donor/:type', authenticate, donorRequest);
historyRouter.post('/patient', authenticate, patientRequest);

module.exports = historyRouter;