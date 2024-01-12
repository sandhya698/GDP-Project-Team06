const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { register, login, auth, logout } = require('../controllers/userController');
const { manageStock, getStock } = require('../controllers/inventoryController');
const { donorRequest, patientRequest } = require('../controllers/historyController');
const { adminControls } = require('../controllers/adminController');

// user routes
router.post('/user/login', login);
router.post('/user/register', register);
router.get('/user/authenticate', authenticate, auth);
router.get('/user/logout/:id', logout);

// inventory routes
router.post('/inventory/manage-stock', manageStock);
router.get('/inventory/get-stock', getStock);

// history routes
router.post('/donor/:type', donorRequest);
router.post('/patient', patientRequest);

// admin routes
router.post('/admin/:user/:type/:status', adminControls);

module.exports = router;