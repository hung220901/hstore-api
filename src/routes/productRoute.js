const express = require('express');
const {verifyToken} = require('../middlewares/verifyToken');
const Router = express.Router();

const{ getAllProducts, getProductById, createOneProduct } = require('../controllers/productController.js'); 


Router.route('/').get(getAllProducts).post(verifyToken, createOneProduct);
Router.route('/:slug').get(getProductById);

module.exports = Router; 