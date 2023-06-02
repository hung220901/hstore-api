const Brand = require('../models/Brand');

exports.getAllBrand = async(req, res, next)=>{
    const page = parseInt(req.query.page) -1|| 0;
    const total = await Brand.countDocuments();
    const limit = parseInt(req.query.limit) || total;
    const totalPage = Math.ceil(total / limit)

    try{
        const brand = await Brand.find({}).skip(page * limit).limit(limit);
        res.status(200).json({page: page + 1,totalPage: totalPage ,totalItem :total,limit: limit ,brand} )

    }catch(error){
        res.json(error)
    }
}
exports.getBrandById = async(req, res, next)=>{
    try{
        const {slug} = req.params;
        const brand = await Brand.findOne({slug:slug});
        res.status(200).json({
            status:'success',
            results: brand.length,
            data:{brand}
        })
    }catch(error){
        res.json(error)
    }
}
exports.createOneBrand = async(req, res, next)=>{
    try{
        const brand = await Brand.create({...req.body});
        res.status(200).json({
            status:'success',
            data:{brand}
        })
    }catch(error){
        next(error);
    }
}

exports.updateOneBrand = async(req, res, next)=>{
    try{
        const slug = req.params.slug;
        const brand = await Brand.findOneAndUpdate({slug},{...req.body},{new: true, runValidator: true});
        res.status(200).json({
            status:'success',
            data:{brand}
        })
    }catch(error){
        res.json(error)
    }
}

exports.deleteOneBrand = async(req, res, next)=>{
    try{
        const {slug} = req.params;
        await Brand.findOneAndDelete({slug});
        res.status(200).json({
            status: 'success',
            message: 'Brand has been deleted'
        })
    }catch(error){
        res.json(error)
    }
}