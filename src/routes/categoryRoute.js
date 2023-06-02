const express = require('express');
const {verifyToken} = require('../middlewares/verifyToken');
const Router = express.Router();

const{ getAllCategories, getCategoryById, createOneCategory, updateOneCategory, deleteOneCategory} = require('../controllers/categoryController.js');

Router.route('/').get(getAllCategories).post(createOneCategory);
Router.route('/:slug').get( getCategoryById).put(updateOneCategory).delete(deleteOneCategory);

module.exports = Router; 