const express = require('express');
const route = express.Router();
const multipart = require('connect-multiparty');

const files = multipart({uploadDir: './products/'});



const productController = require('../services/product');
route.post('/create-product', productController.newProduct);
route.get('/products/:category?', productController.getProduct);
route.post('/image-product/:id', [files], productController.productImage);
route.get('/image-product/:image', [files], productController.getImageFile);

module.exports = route;