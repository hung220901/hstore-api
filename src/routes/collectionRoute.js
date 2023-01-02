const express = require('express');
const {verifyToken} = require('../middlewares/verifyToken');
const Router = express.Router();

const{ getAllCollection ,getCollectionById , createOneCollection, updateOneCollection,deleteOneCollection} = require('../controllers/collectionController.js');

Router.route('/').get(getAllCollection).post(verifyToken, createOneCollection);
Router.route('/:slug').get( getCollectionById).put(verifyToken, updateOneCollection).delete(verifyToken, deleteOneCollection);

module.exports = Router; 