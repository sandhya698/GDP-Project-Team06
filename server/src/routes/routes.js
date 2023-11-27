const express = require('express');
const router = express.Router();
const { register, login, auth, logout } = require('../controllers/userController');
const authenticate = require('../middleware/auth');
const { addStock } = require('../controllers/inventoryController');

// user routes
router.post('/user/login', login);
router.post('/user/register', register);
router.get('/user/authenticate', authenticate, auth);
router.get('/user/logout/:id', logout);

// inventory routes
router.post('/inventory/addStock', addStock);

module.exports = router;