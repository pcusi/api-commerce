const express = require('express');
const route = express.Router();


const userController = require('../controllers/user');
route.post('/create-user', userController.newUser);
route.post('/sign-in', userController.signIn);

module.exports = route;