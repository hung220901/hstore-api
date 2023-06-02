const Review = require('../models/Review') 
const User = require('../models/User');
const Product = require('../models/Product');

exports.getAllReview = async(req, res, next)=>{
    const page = parseInt(req.query.page) -1|| 0;
    const total = await Review.countDocuments();
    const limit = parseInt(req.query.limit) || total;
    const totalPage = Math.ceil(total / limit)

    try{ 

        const review = await Review.find()
            .populate({ path: 'userId', select: 'name email avatar' }) 
            .populate({ path: 'productId', select: 'slug' }) 
            .skip(page * limit)
            .limit(limit);


        res.status(200).json({page: page + 1,totalPage: totalPage ,totalItem :total,limit: limit ,data:review}) 
    }catch(error){
        res.json(error)
    }
}
 

exports.getAllReviewByEmailUser = async(req, res, next)=>{
    try{
        const {email} = req.params; 
        const user = await User.findOne({email})  
        const review = await Review.findOne({userId:user._id})
        .populate({ path: 'userId', select: 'name email avatar' }) 
        res.status(200).json({
            status:'success', 
            data:review, 
        })
    }catch(error){
        res.json(error)
    }
}



exports.createOneReview = async(req, res, next)=>{
    try{  
        const {content, rating, email, productId } = req.body
        const userId = await User.findOne({email}) 
        const review = await Review.create({
            content,
            userId:userId._id,
            rating,
            productId
        })  
        // Average rating
        // 1. Lấy ID sản phẩm đó
        // 2. Lấy hết tất cả rating của sp đó
        // 3. tính tbc  = tổng rating / lượt rating
        // 4. Update rating trong collection product 
        const allReviewOfProduct = await Review.find({productId}) 
        const averageRating = allReviewOfProduct.reduce((acc,cur)=> acc+=parseInt(cur.rating) ,0) / allReviewOfProduct.length
        await Product.findByIdAndUpdate(productId,{averageRating},{new: true, runValidator: true})

        res.status(200).json({
            status:'success',   
            data:review
        })
    }catch(error){
        next(error);
    }
} 

exports.deleteOneReview = async(req, res, next)=>{
    try{
        const {id} = req.params; 
        await Review.findOneAndDelete({id});
        res.status(200).json({
            status: 'success',
            message: 'Review has been deleted'
        })
    }catch(error){
        res.json(error)
    }
}