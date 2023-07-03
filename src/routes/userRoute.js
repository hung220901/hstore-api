const express = require('express');
const Router = express.Router();
const{getAllUsers,deleteUserWishlist,getUserWishlist,updateUserWishlistItem,updateUserWishlist, getUserByEmail, createOneUser, updateOneUser, deleteOneUser,resetPassword , checkResetPassword,confirmResetPassword} = require('../controllers/userController');
const { verifyToken } = require('../middlewares/verifyToken');


Router.route("/").get(getAllUsers).post(verifyToken,createOneUser);
Router.route("/forgot-password").post(verifyToken,resetPassword);
Router.route("/confirm-password/:id/:token").get(checkResetPassword).post(verifyToken,confirmResetPassword);
Router.route('/account').get(getUserByEmail).put(verifyToken,updateOneUser).delete(verifyToken,deleteOneUser);
Router.route('/wishlist').get(getUserWishlist).put(verifyToken,updateUserWishlist)
Router.route('/wishlist/:prodId').put(verifyToken,updateUserWishlistItem).delete(verifyToken,deleteUserWishlist)

module.exports = Router;