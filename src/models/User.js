const express = require('express');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type: String, trim: true, required: [true,'Name must be required']},
    email:{type: String, unique: true, trim: true, required: [true,'Email must be required']},
    role:{type: String, trim: true, default: 'User'},
    password:{type: String, trim: true, required: [true,'Password must be required'],minlength:[6,'Password must be at least 6 characters']},
    phone:{type: Number,index: { unique: true, sparse: true }},
    address:{type: String, trim: true},
    wishlist:{type: Array}
},{timestamps: true})

userSchema.pre('save', function(next){
    let user = this;
    bcrypt.hash(user.password, 10, function(error, hash){
        if(error){
            return next(error);
        }
        else{
            user.password = hash;
            next()
        }
    })
})

const User = mongoose.model('User', userSchema);
module.exports = User;