const Category = require('../models/Category');

exports.getAllCategories = async(req, res, next)=>{
    const page = parseInt(req.query.page) -1|| 0;
    const total = await Category.countDocuments();
    const limit = parseInt(req.query.limit) || total;
    const totalPage = Math.ceil(total / limit)

    try{
        const categories = await Category.find({}).skip(page * limit).limit(limit);;
        res.status(200).json({page: page + 1,totalPage: totalPage ,totalItem :total,limit: limit ,categories} )

    }catch(error){
        res.json(error)
    }
}
exports.getCategoryById = async(req, res, next)=>{
    try{
        const {slug} = req.params;
        const category = await Category.findOne({slug:slug});
        res.status(200).json({
            status:'success',
            results: category.length,
            data:{category}
        })
    }catch(error){
        res.json(error)
    }
}
exports.createOneCategory = async(req, res, next)=>{
    try{
        const category = await Category.create({...req.body});
        res.status(200).json({
            status:'success',
            data:{category}
        })
    }catch(error){
        next(error);
    }
}

exports.updateOneCategory = async(req, res, next)=>{
    try{
        const slug = req.params.slug;
        const category = await Category.findOneAndUpdate({slug},{...req.body},{new: true, runValidator: true});
        res.status(200).json({
            status:'success',
            data:{category}
        })
    }catch(error){
        res.json(error)
    }
}

exports.deleteOneCategory = async(req, res, next)=>{
    try{
        const {slug} = req.params;
        await Category.findOneAndDelete({slug});
        res.status(200).json({
            status: 'success',
            message: 'Category has been deleted'
        })
    }catch(error){
        res.json(error)
    }
}