const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');

// user routes
router.get('/user/login', login);
router.get('/user/register', register);

module.exports = router;