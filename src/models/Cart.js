const mongoose = require('mongoose'); 
const cartSchema = new mongoose.Schema({
    items: [
        {
            product:{ type: mongoose.Schema.Types.ObjectId, ref:'Product' },
            quantity:{ type:Number, default:1},
            price:{type:Number}
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    totalPrice:{type:Number, default:0}
},{ timestamps:{ createdAt: true, updatedAt:false}})

 
const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;