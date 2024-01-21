const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const { register, login, auth, logout } = require('../controllers/userController');
const { manageStock, getStock, miscStats } = require('../controllers/inventoryController');
const { donorRequest, patientRequest } = require('../controllers/historyController');
const { adminControls } = require('../controllers/adminController');
const { statusUpdate, getDonors, getPatients } = require('../controllers/userAdminController');

// user routes
router.post('/user/login', login);
router.post('/user/register', register);
router.get('/user/authenticate', authenticate, auth);
router.get('/user/logout/:id', logout);

// inventory routes
router.post('/inventory/manage-stock/:type', adminAuth, manageStock);
router.get('/inventory/get-stock', adminAuth, getStock);
router.get('/inventory/misc-stats', adminAuth, miscStats);

// history routes
router.post('/donor/:type', authenticate, donorRequest);
router.post('/patient', authenticate, patientRequest);

// admin routes
router.post('/admin/:user/:type/:status', adminAuth, adminControls);
router.post('/admin/user/:id/:status', adminAuth, statusUpdate);
router.get('/admin/donor-list', adminAuth, getDonors);
router.get('/admin/patient-list', adminAuth, getPatients);

module.exports = router;