const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{ type: String, unique: true, required: [true, 'Comment must have content'], trim: true},
    rating:{ type: String,  required: [true, 'Comment must have rating'], trim: true},
    productID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    } 
},{ timestamps:{ createdAt: true, updatedAt:false}})


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;