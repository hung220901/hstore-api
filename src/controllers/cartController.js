 
const Cart = require('../models/Cart');
const User = require('../models/User');


exports.getAllCart = async(req, res, next)=>{
    const page = parseInt(req.query.page) -1|| 0;
    const total = await Cart.countDocuments();
    const limit = parseInt(req.query.limit) || total;
    const totalPage = Math.ceil(total / limit)

    try{
        const cart = await Cart.find()
            .populate({ path: 'user', select: 'name email avatar' })
            .populate({ path: 'items.product', select: 'name price image' })  
            .skip(page * limit)
            .limit(limit);
        res.status(200).json({page: page + 1,totalPage: totalPage ,totalItem :total,limit: limit ,data:cart})

    }catch(error){
        res.json(error)
    }
}
exports.getCartByEmail = async(req, res, next)=>{
    try{
        const {email} = req.params; 
        const user = await User.findOne({email})  
        const cart = await Cart.findOne({user:user._id})
            .populate({ path: 'user', select: 'name email avatar' })
            .populate({ path: 'items.product', select: 'name price image' })  

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
            items,
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
        const {items, email, totalPrice} = req.body.data 
        const userId = await User.findOne({email}) 
        const {id} = req.query;
        const cart = await Cart.findById(id)  
        if(!cart){
            res.status(200).json({
                status:'Fail',
                msg:'Cart not found!'
            })
        }else{  
            const cartUpdated = await Cart.findOneAndUpdate({
                items,
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
        const {email} = req.params; 
        await Cart.findOneAndDelete({email});
        res.status(200).json({
            status: 'success',
            message: 'Cart has been deleted'
        })
    }catch(error){
        res.json(error)
    }
}