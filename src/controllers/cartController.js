const Cart = require('../models/Cart');

exports.getAllCart = async(req, res, next)=>{
    const page = parseInt(req.query.page) -1|| 0;
    const total = await Cart.countDocuments();
    const limit = parseInt(req.query.limit) || total;
    const totalPage = Math.ceil(total / limit)

    try{
        const cart = await Cart.find({}).skip(page * limit).limit(limit);;
        res.status(200).json({page: page + 1,totalPage: totalPage ,totalItem :total,limit: limit ,cart} )

    }catch(error){
        res.json(error)
    }
}
exports.getCartByUserName = async(req, res, next)=>{
    try{
        const {slug} = req.params;
        const cart = await Cart.findOne({slug:slug});
        res.status(200).json({
            status:'success',
            results: Cart.length,
            data:{Cart}
        })
    }catch(error){
        res.json(error)
    }
}

exports.createOneCart = async(req, res, next)=>{
    try{
        const cart = await Cart.create({...req.body});
        res.status(200).json({
            status:'success',
            data:{Cart}
        })
    }catch(error){
        next(error);
    }
} 
exports.updateOneCart = async(req, res, next)=>{
    try{
        const slug = req.params.slug;
        const cart = await Cart.findOneAndUpdate({slug},{...req.body},{new: true, runValidator: true});
        res.status(200).json({
            status:'success',
            data:{cart}
        })
    }catch(error){
        res.json(error)
    }
} 
exports.deleteOneCart = async(req, res, next)=>{
    try{
        const {slug} = req.params;
        await Cart.findOneAndDelete({slug});
        res.status(200).json({
            status: 'success',
            message: 'Cart has been deleted'
        })
    }catch(error){
        res.json(error)
    }
}