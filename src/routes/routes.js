const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');

// user routes
router.post('/user/login', login);
router.post('/user/register', register);

module.exports = router;