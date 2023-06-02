const express = require('express');
const Router = express.Router();
const { getAllReview,getAllReviewByEmailUser,createOneReview,deleteOneReview} = require('../controllers/reviewController');


Router.route("/").get(getAllReview).post(createOneReview);
Router.route("/:email").get(getAllReviewByEmailUser).delete(deleteOneReview);
 

module.exports = Router;