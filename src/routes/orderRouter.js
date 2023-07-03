const express = require('express');
const {verifyToken} = require('../middlewares/verifyToken');
const Router = express.Router();

const{getAllOrder, getOrderById ,createOneOrder, updateOneOrder } = require('../controllers/orderController');

Router.route('/').get(getAllOrder).post(verifyToken,createOneOrder);
Router.route('/:id').get(getOrderById).put(verifyToken,updateOneOrder)

module.exports = Router; 