const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    total:{type: String, trim: true},
    shippingDate:{type: String,trim:true},
    isDelivered:{type: Boolean},
    isConfirm:{type:Boolean},
},{ timestamps:{ createdAt: true, updatedAt:false}})


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;