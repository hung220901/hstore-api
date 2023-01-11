const Product = require('../models/Product');
const cloudinary = require('../middlewares/cloudinary')

exports.getAllProducts = async(req, res, next)=>{
    // try{
    //     let posts;
    //     // Pagination
    //     const page = parseInt(req.query.page) -1|| 0;
    //     const limit = parseInt(req.query.limit) || 5;
    //     const total = await Post.countDocuments();
    //     const totalPage = Math.ceil(total / limit)
    //     // getPostByCategory
    //     const cat = req.query.cat;
    //     if(cat){
    //         // Find category exist
    //         const category = await Category.findOne({"slug":cat})
    //         if(category){
    //             posts = await Post.find({category}).populate({
    //                 path: 'author',
    //                 select: 'name'
    //             }).populate({
    //                 path: 'category',
    //                 select: 'slug name'
    //             }).populate({
    //                 path: 'comments',
    //                 select: 'text',
    //                 populate:{
    //                     path: 'user_id',
    //                     select:'name'
    //                 },
    //             });  
    //             res.status(200).json({posts})             
    //         }
    //         else{
    //             res.status(400).json({
    //                 'message':'Category not found',
    //             })

    //         }


            
    //     }
    //     else{
    //         posts = await Post.find({}).populate({
    //             path: 'author',
    //             select: 'name'
    //         }).populate({
    //             path: 'category',
    //             select: 'slug name'
    //         }).populate({
    //             path: 'comments',
    //             select: 'text',
    //             populate:{
    //                 path: 'user_id',
    //                 select:'name'
    //             },
    //         }).skip(page * limit).limit(limit);            
    //         res.status(200).json({page: page + 1,totalPage: totalPage ,totalItem :total,limit: limit ,posts} )
    //     }
    // }catch(error){
    //     res.json(error)
    // }
    try{
        const product = await Product.find({})
        res.status(200).json({product} )
    }catch(err){
        res.json({err})
    }
}
exports.getProductById = async(req, res, next)=>{
    try{
        const {slug} = req.params;
        const product = await Product.findOne({slug:slug});
        res.status(200).json({product})
    }catch(error){
        res.json(error)
    }
} 
exports.createOneProduct = async(req, res, next)=>{
    try{  
        let urls = []
        const files = req.files; 
        if(!files){
            res.send('please choose file').status(400);
            return next()
        }
        else{ 
            for(const file of files){
                const {path} = file;
                await cloudinary.uploader.upload(path,(err, res)=>{
                    if(err){
                        console.log(err);
                        if(req.file){
                            cloudinary.uploader.destroy(file.filename)
                        }
                        throw Error;
                    }
                    return data = {
                        public_id: res.public_id,
                        url: res.secure_url
                    } 
                })
                urls.push(data) 
            }
            const getImg1 = urls.shift()
            const product = await Product.create({
                thumbnail: urls,
                image:{
                  public_id: getImg1.public_id,
                  url:getImg1.url  
                },
                ...req.body
            }); 
            res.status(200).json({
                status:'success',
                data:{product}
            })  
        }


    }catch(error){
        next(error);
    }
} 
exports.updateOneProduct = async(req, res, next)=>{
    try{
        const slug = req.params.slug;
        const categorySlug = req.body.category;
        const category = await Category.findOne({slug:categorySlug});
        const product = await Product.findOneAndUpdate({slug},{
            ...req.body,
            category
        },{new: true, runValidator: true});
        res.status(200).json({
            status:'success',
            data:{product}
        })
    }catch(error){
        res.json(error)
    }
} 
exports.deleteOneProduct= async(req, res, next)=>{
    try{
        const {slug} = req.params;
        const product = await Product.findOneAndDelete(slug); 
        if(!product){
            res.status(404).json({
                message: 'product not found'
            })
        }
        else{
            await Comment.deleteMany({product_id: slug});
            res.status(200).json({
                status: 'success',
                message: 'product has been deleted' 
            })
        }

    }catch(error){
        res.json(error)
    }
}