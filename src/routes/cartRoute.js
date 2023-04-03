const express = require('express');
const {verifyToken} = require('../middlewares/verifyToken');
const Router = express.Router();

const{getAllCart,getCartByUser,createOneCart,updateOneCart,deleteOneCart } = require('../controllers/cartController');

Router.route('/').get(getAllCart).post(createOneCart);
Router.route('/:id').get(getCartByUser).put(verifyToken, updateOneCart).delete(verifyToken, deleteOneCart);

module.exports = Router; 