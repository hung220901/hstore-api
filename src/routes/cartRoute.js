const express = require('express');
const {verifyToken} = require('../middlewares/verifyToken');
const Router = express.Router();

const{getAllCart,getCartByEmail,createOneCart,updateOneCart,deleteOneCart } = require('../controllers/cartController');

Router.route('/').get(getAllCart).post(createOneCart);
Router.route('/:email').get(getCartByEmail).put(updateOneCart).delete( deleteOneCart);

module.exports = Router; 