const express = require('express');
const {verifyToken} = require('../middlewares/verifyToken');
const Router = express.Router();

const{getAllCart,getCartByEmail,createOneCart,updateOneCart,deleteOneCart } = require('../controllers/cartController');

Router.route('/').get(getAllCart).post(verifyToken,createOneCart);
Router.route('/:email').get(getCartByEmail).put(verifyToken,updateOneCart).delete(verifyToken, deleteOneCart);

module.exports = Router; 