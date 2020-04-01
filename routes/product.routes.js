const express = require('express');
const route = express.Router();


const productController = require('../controllers/product');
route.post('/create-product', productController.newProduct);
route.get('/products/:category?', productController.getProduct);

module.exports = route;