const express = require('express'); 
const Router = express.Router();
const {payment} = require("../controllers/payController")

Router.route("/payment").post(payment)


module.exports = Router