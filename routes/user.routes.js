const express = require('express');
const route = express.Router();
const auth = require('../middlewares/auth');
const multipart = require('connect-multiparty');

const files = multipart({uploadDir: './users/'});

const userController = require('../services/user');
route.post('/create-user', userController.newUser);
route.post('/sign-in', userController.signIn);
route.post('/image-user/:id', [files, auth.userAuth], userController.userPhoto);


module.exports = route;