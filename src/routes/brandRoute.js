const express = require('express');
const {verifyToken} = require('../middlewares/verifyToken');
const Router = express.Router();

const{createOneBrand,deleteOneBrand,getAllBrand,getBrandById,updateOneBrand } = require('../controllers/brandController');

Router.route('/').get(getAllBrand).post(verifyToken,createOneBrand);
Router.route('/:slug').get( getBrandById).put( verifyToken,updateOneBrand).delete( verifyToken, deleteOneBrand);

module.exports = Router; 