const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    product: [
        {
            productId:{
                type: String
            },
            quantity:{
                type:Number,
                default:1,
            },
        }
    ],
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],  
},{ timestamps:{ createdAt: true, updatedAt:false}})


const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;