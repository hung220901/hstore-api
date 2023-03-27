const express = require('express');
const Router = express.Router();
const{getAllUsers, getUserById, createOneUser, updateOneUser, deleteOneUser,resetPassword , checkResetPassword,confirmResetPassword} = require('../controllers/userController');


Router.route("/").get(getAllUsers).post(createOneUser);
Router.route("/forgot-password").post(resetPassword);
Router.route("/confirm-password/:id/:token").get(checkResetPassword).post(confirmResetPassword);
Router.route('/:userIdd').get(getUserById).put(updateOneUser).delete(deleteOneUser);

module.exports = Router;