const { default: mongoose } = require('mongoose');
const Cart = require('../models/Cart');
const User = require('../models/User');


exports.getAllCart = async(req, res, next)=>{
    const page = parseInt(req.query.page) -1|| 0;
    const total = await Cart.countDocuments();
    const limit = parseInt(req.query.limit) || total;
    const totalPage = Math.ceil(total / limit)

    try{
        const cart = await Cart.find().populate({
            path:'items.product',
            select:'name image price'
        }).skip(page * limit).limit(limit);
        res.status(200).json({page: page + 1,totalPage: totalPage ,totalItem :total,limit: limit ,data:cart})

    }catch(error){
        res.json(error)
    }
}
exports.getCartByUser = async(req, res, next)=>{
    try{
        const {id} = req.params; 
        const user = await User.findById({_id:id})
        const cart = await Cart.findOne({user}).populate({
            path:'user',
            select:'-wishlist -password -role -avatar'
        })
        
        await cart.populate('items.product')
        res.status(200).json({
            status:'success', 
            data:cart, 
        })
    }catch(error){
        res.json(error)
    }
}

exports.createOneCart = async(req, res, next)=>{
    try{  
        const {items, email, totalPrice} = req.body.data
        const userId = await User.findOne({email}) 
        const cart = await Cart.create({
            items:items.map(item=>({product:item._id,quantity:item.quantity,subTotal:item.subTotal })),
            user:userId._id,
            totalPrice
        }) 
        res.status(200).json({
            status:'success',
            data:cart
        })
    }catch(error){
        next(error);
    }
} 


exports.updateOneCart = async(req, res, next)=>{
    try{ 
        const {items, email, totalPrice} = req.body 
        const userId = await User.findOne({email}) 
        const {id} = req.params
        const cart = await Cart.findById(id) 
        if(!cart){
            res.status(200).json({
                status:'Fail',
                msg:'Cart not found!'
            })
        }else{ 
            const cartUpdated = await Cart.findOneAndUpdate({
                items:items.map(item=>({product:item._id,quantity:item.quantity,subTotal:item.subTotal })),
                user:userId._id,
                totalPrice
            })        
            res.status(200).json({
                status:'success',
                data:cartUpdated
            })
        } 
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