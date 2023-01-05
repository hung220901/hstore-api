const OrderDetail = require('../models/OrderDetail');

exports.getAllOrderDetail = async(req, res, next)=>{
    const page = parseInt(req.query.page) -1|| 0;
    const total = await OrderDetail.countDocuments();
    const limit = parseInt(req.query.limit) || total;
    const totalPage = Math.ceil(total / limit)

    try{
        const orderDetail = await OrderDetail.find({}).skip(page * limit).limit(limit);;
        res.status(200).json({page: page + 1,totalPage: totalPage ,totalItem :total,limit: limit ,orderDetail} )

    }catch(error){
        res.json(error)
    }
}
exports.getOrderDetailByUserName = async(req, res, next)=>{
    try{
        const {slug} = req.params;
        const orderDetail = await OrderDetail.findOne({slug:slug});
        res.status(200).json({
            status:'success',
            results: orderDetail.length,
            data:{orderDetail}
        })
    }catch(error){
        res.json(error)
    }
}
exports.createOneOrderDetail = async(req, res, next)=>{
    try{
        const orderDetail = await OrderDetail.create({...req.body});
        res.status(200).json({
            status:'success',
            data:{orderDetail}
        })
    }catch(error){
        next(error);
    }
} 
exports.updateOneOrderDetail = async(req, res, next)=>{
    try{
        const slug = req.params.slug;
        const orderDetail = await OrderDetail.findOneAndUpdate({slug},{...req.body},{new: true, runValidator: true});
        res.status(200).json({
            status:'success',
            data:{orderDetail}
        })
    }catch(error){
        res.json(error)
    }
} 
exports.deleteOneOrderDetail = async(req, res, next)=>{
    try{
        const {slug} = req.params;
        await OrderDetail.findOneAndDelete({slug});
        res.status(200).json({
            status: 'success',
            message: 'OrderDetail has been deleted'
        })
    }catch(error){
        res.json(error)
    }
}