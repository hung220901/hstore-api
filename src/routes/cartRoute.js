const express = require('express');
const {verifyToken} = require('../middlewares/verifyToken');
const Router = express.Router();

const{getAllCart,getCartByUserName,createOneCart,updateOneCart,deleteOneCart } = require('../controllers/cartController');

Router.route('/').get(getAllCart).post(verifyToken, createOneCart);
Router.route('/:slug').get(getCartByUserName).put(verifyToken, updateOneCart).delete(verifyToken, deleteOneCart);

module.exports = Router; 