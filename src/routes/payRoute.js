const express = require('express'); 
const Router = express.Router();
const {payment,createPaymentVNPAY,returnUrlVNPay,queryTransVNPay,refundVNPay} = require("../controllers/payController") 

Router.route("/payment").post(payment)
Router.route("/create_payment_vnpay_url").post(createPaymentVNPAY)
Router.route("/ipn_url").get(returnUrlVNPay)
Router.route('/refund').get(refundVNPay)
Router.route("/querydr").get(queryTransVNPay)

module.exports = Router