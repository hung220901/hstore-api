const Collection = require('../models/Collection');

exports.getAllCollection = async(req, res, next)=>{
    const page = parseInt(req.query.page) -1|| 0;
    const total = await Collection.countDocuments();
    const limit = parseInt(req.query.limit) || total;
    const totalPage = Math.ceil(total / limit)

    try{
        const collection = await Collection.find({}).skip(page * limit).limit(limit);;
        res.status(200).json({page: page + 1,totalPage: totalPage ,totalItem :total,limit: limit ,collection} )

    }catch(error){
        res.json(error)
    }
}
exports.getCollectionById = async(req, res, next)=>{
    try{
        const {slug} = req.params;
        const collection = await Collection.findOne({slug:slug});
        res.status(200).json({
            status:'success',
            results: collection.length,
            data:{collection}
        })
    }catch(error){
        res.json(error)
    }
}
exports.createOneCollection = async(req, res, next)=>{
    try{
        const collection = await Collection.create({...req.body});
        res.status(200).json({
            status:'success',
            data:{collection}
        })
    }catch(error){
        next(error);
    }
}

exports.updateOneCollection = async(req, res, next)=>{
    try{
        const slug = req.params.slug;
        const collection = await Collection.findOneAndUpdate({slug},{...req.body},{new: true, runValidator: true});
        res.status(200).json({
            status:'success',
            data:{collection}
        })
    }catch(error){
        res.json(error)
    }
}

exports.deleteOneCollection = async(req, res, next)=>{
    try{
        const {slug} = req.params;
        await Collection.findOneAndDelete({slug});
        res.status(200).json({
            status: 'success',
            message: 'Collection has been deleted'
        })
    }catch(error){
        res.json(error)
    }
}