const mongoose = require('mongoose'); 
const orderSchema = new mongoose.Schema({ 
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            quantity:{type:Number, default: 1,required: [true,'Quantity must be required']},
        }
    ],
    total:{type: String, trim: true},
    shippingDate:{type: String,trim:true},
    status:{type: String, default: "pending"},
    note:{type:String, trim:true},
    address:{type:Object}
},{ timestamps:{ createdAt: true, updatedAt:false}})

 

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;