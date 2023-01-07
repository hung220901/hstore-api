const express = require('express');
const{ upload } = require('../controllers/uploadController'); 
const Router = express.Router();
const store = require('../middlewares/multer')

Router.route("/upload").post(upload); 
 

module.exports = Router;