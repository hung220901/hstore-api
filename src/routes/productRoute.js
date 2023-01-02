const express = require('express');
const {verifyToken} = require('../middlewares/verifyToken');
const Router = express.Router();

const{ getAllProducts, getProductById, createOneProduct,updateOneProduct,deleteOneProduct } = require('../controllers/productController.js'); 


Router.route('/').get(getAllProducts).post(verifyToken, createOneProduct);
Router.route('/:slug').get(getProductById).put(verifyToken, updateOneProduct).delete(verifyToken, deleteOneProduct);

module.exports = Router; 