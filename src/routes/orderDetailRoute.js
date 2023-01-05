const express = require('express');
const {verifyToken} = require('../middlewares/verifyToken');
const Router = express.Router();

const{getAllOrderDetail, getOrderDetailByUserName,createOneOrderDetail, updateOneOrderDetail,deleteOneOrderDetail } = require('../controllers/orderDetailController');

Router.route('/').get(getAllOrderDetail).post(verifyToken, createOneOrderDetail);
Router.route('/:slug').get(getOrderDetailByUserName).put(verifyToken, updateOneOrderDetail).delete(verifyToken, deleteOneOrderDetail);

module.exports = Router; 