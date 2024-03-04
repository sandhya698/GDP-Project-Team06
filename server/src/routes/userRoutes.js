const express = require('express');
const userRouter = express.Router();
const authenticate = require('../middleware/auth');
const { register, login, auth, logout, updateuser } = require('../controllers/userController');

// user routes
userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.get('/authenticate', authenticate, auth);
userRouter.get('/logout/:id', logout);
userRouter.post('/updateProfile', authenticate, updateuser);

module.exports = userRouter;