const mongoose = require('mongoose');  
const orderSchema = new mongoose.Schema({ 
    orderId: {
        type: String,
        require:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }, 
    items: [
        {
            product:{ 
                type: mongoose.Schema.Types.ObjectId, ref:'Product' 
            },
            quantity:{ 
                type:Number,
                default:1
            },
            subTotal:{
                type:Number
            }
        }
    ],
    total:{type: String, trim: true},
    shippingDate:{type: String,trim:true},
    shippingFee:{type:Number,require:true},
    paymentMethod:{type:String,require:true},
    status:{type: String,enum: ['Pending', 'Shipping', 'Delivered', 'Canceled'], default: 'Pending'},
    note:{type:String, trim:true},
    paymentStatus:{type:String, default:'0'},
    transId:{type:String},
    transDate:{type:String},
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true }, 
        zipCode: { type: String, required: true },
    }
},{ timestamps:{ createdAt: true, updatedAt:false}})

 

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;