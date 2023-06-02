const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    content:{ type: String, unique: true, required: [true, 'Review must have content'], trim: true},
    rating:{ type: String,  required: [true, 'Review must have rating'], trim: true},
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }, 
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }, 
    
},{ timestamps:{ createdAt: true, updatedAt:false}})


const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;