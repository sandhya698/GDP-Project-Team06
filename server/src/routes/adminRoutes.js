const express = require('express');
const adminRouter = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { adminControls } = require('../controllers/adminController');
const { statusUpdate, getDonors, getPatients, getDonationsList, getRequestsList } = require('../controllers/userAdminController');

// admin routes
adminRouter.post('/:user/:type/:status', adminAuth, adminControls);
adminRouter.post('/status/update/:id/:status', adminAuth, statusUpdate);
adminRouter.get('/donor-list', adminAuth, getDonors);
adminRouter.get('/patient-list', adminAuth, getPatients);
adminRouter.get('/donations-list', adminAuth, getDonationsList);
adminRouter.get('/requests-list', adminAuth, getRequestsList);

module.exports = adminRouter;