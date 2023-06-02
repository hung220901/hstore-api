const express = require('express');
const Router = express.Router();
const {getImages} = require('../controllers/imageController');

 
Router.route('/').get(getImages)

module.exports = Router;

