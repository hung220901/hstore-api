const Order = require('../models/Order');
const User = require('../models/User');
const dayjs = require('dayjs'); 
exports.getAllOrder = async(req, res, next)=>{
    const page = parseInt(req.query.page) -1|| 0;
    const total = await Order.countDocuments();
    const limit = parseInt(req.query.limit) || total;
    const totalPage = Math.ceil(total / limit)

    try{ 
        const order = await Order.find({})
            .populate({ path: 'user', select: 'name email avatar' })
            .populate({ path: 'items.product', select: 'name price' })
            .skip(page * limit)
            .limit(limit);
        res.status(200).json({page: page + 1,totalPage: totalPage ,totalItem :total,limit: limit ,order} ) 
    }catch(error){
        res.json(error)
    }
}
exports.getOrderById = async(req, res, next)=>{
    try{
        const {id} = req.params;
        const order = await Order.findOne({orderId:id});
        res.status(200).json({
            status:'success',
            results: order.length,
            data:order
        })
    }catch(error){
        res.json(error)
    }
}
exports.createOneOrder = async(req, res, next)=>{
    try{ 
        const {items, email, shippingAddress,...rest} = req.body 
        const userId = await User.findOne({email})
        const shippingDate = dayjs().add(3, 'day').format('DD/MM/YYYY');
        const order = await Order.create({
            items,
            user:userId._id,
            shippingDate,
            shippingAddress,
            rest
        });
        res.status(200).json({
            status:'success',
            data:order
        })
    }catch(error){
        next(error);
    }
} 
exports.updateOneOrder = async(req, res, next)=>{
    try{
        const {id} = req.params;
        const order = await Order.findOneAndUpdate({orderId:id},{...req.body},{new: true, runValidator: true});
        res.status(200).json({
            status:'success',
            data:order
        })
    }catch(error){
        res.json(error)
    }
} 
exports.deleteOneOrder = async(req, res, next)=>{
    try{
        const {id} = req.params;
        await Order.findOneAndDelete({orderId:id});
        res.status(200).json({
            status: 'success',
            message: 'Order has been deleted'
        })
    }catch(error){
        res.json(error)
    }
}
 
