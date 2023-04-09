const express = require('express');
const Router = express.Router();
const{getAllUsers,deleteUserWishlist,getUserWishlist,updateUserWishlistItem,updateUserWishlist, getUserByEmail, createOneUser, updateOneUser, deleteOneUser,resetPassword , checkResetPassword,confirmResetPassword} = require('../controllers/userController');


Router.route("/").get(getAllUsers).post(createOneUser);
Router.route("/forgot-password").post(resetPassword);
Router.route("/confirm-password/:id/:token").get(checkResetPassword).post(confirmResetPassword);
Router.route('/account').get(getUserByEmail).put(updateOneUser).delete(deleteOneUser);
Router.route('/wishlist').get(getUserWishlist).put(updateUserWishlist)
Router.route('/wishlist/:prodId').put(updateUserWishlistItem).delete(deleteUserWishlist)

module.exports = Router;