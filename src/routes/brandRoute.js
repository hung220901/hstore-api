const express = require('express');
const {verifyToken} = require('../middlewares/verifyToken');
const Router = express.Router();

const{createOneBrand,deleteOneBrand,getAllBrand,getBrandById,updateOneBrand } = require('../controllers/brandController');

Router.route('/').get(getAllBrand).post( createOneBrand);
Router.route('/:slug').get( getBrandById).put( updateOneBrand).delete( deleteOneBrand);

module.exports = Router; 