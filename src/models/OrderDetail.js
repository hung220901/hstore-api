const mongoose = require('mongoose');
const orderDetailSchema = new mongoose.Schema({
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    order:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ],
    subTotal:{type: String, trim: true},
    note:{type:String, trim:true}
},{ timestamps:{ createdAt: true, updatedAt:false}})


const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);
module.exports = OrderDetail;