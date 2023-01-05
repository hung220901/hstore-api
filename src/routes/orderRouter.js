const express = require('express');
const {verifyToken} = require('../middlewares/verifyToken');
const Router = express.Router();

const{getAllOrder, getOrderByUserName ,createOneOrder, updateOneOrder,deleteOneOrder } = require('../controllers/orderController');

Router.route('/').get(getAllOrder).post(verifyToken, createOneOrder);
Router.route('/:slug').get(getOrderByUserName).put(verifyToken, updateOneOrder).delete(verifyToken, deleteOneOrder);

module.exports = Router; 