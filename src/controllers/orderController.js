const Order = require('../models/Order');




exports.getAllOrder = async(req, res, next)=>{
    const page = parseInt(req.query.page) -1|| 0;
    const total = await Order.countDocuments();
    const limit = parseInt(req.query.limit) || total;
    const totalPage = Math.ceil(total / limit)

    try{
        const order = await Order.find({}).skip(page * limit).limit(limit);;
        res.status(200).json({page: page + 1,totalPage: totalPage ,totalItem :total,limit: limit ,order} )

    }catch(error){
        res.json(error)
    }
}
exports.getOrderByUserName = async(req, res, next)=>{
    try{
        const {slug} = req.params;
        const order = await Order.findOne({slug:slug});
        res.status(200).json({
            status:'success',
            results: order.length,
            data:{order}
        })
    }catch(error){
        res.json(error)
    }
}
exports.createOneOrder = async(req, res, next)=>{
    try{
        const order = await Order.create({...req.body});
        res.status(200).json({
            status:'success',
            data:{order}
        })
    }catch(error){
        next(error);
    }
} 
exports.updateOneOrder = async(req, res, next)=>{
    try{
        const slug = req.params.slug;
        const order = await Order.findOneAndUpdate({slug},{...req.body},{new: true, runValidator: true});
        res.status(200).json({
            status:'success',
            data:{order}
        })
    }catch(error){
        res.json(error)
    }
} 
exports.deleteOneOrder = async(req, res, next)=>{
    try{
        const {slug} = req.params;
        await Order.findOneAndDelete({slug});
        res.status(200).json({
            status: 'success',
            message: 'Order has been deleted'
        })
    }catch(error){
        res.json(error)
    }
}