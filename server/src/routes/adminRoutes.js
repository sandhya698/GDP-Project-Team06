const express = require('express');
const adminRouter = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { adminControls } = require('../controllers/adminController');
const { statusUpdate, getDonors, getPatients, getDonationsList, getRequestsList } = require('../controllers/userAdminController');

// admin auth is required for all routes
adminRouter.use(adminAuth);

// admin routes
adminRouter.post('/:user/:type/:status',  adminControls);
adminRouter.post('/status/update/:id/:status',  statusUpdate);
adminRouter.get('/donor-list',  getDonors);
adminRouter.get('/patient-list',  getPatients);
adminRouter.get('/donations-list',  getDonationsList);
adminRouter.get('/requests-list',  getRequestsList);

module.exports = adminRouter;