const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const cloudinary = require('../middlewares/cloudinary')

exports.getAllProducts = async(req, res, next)=>{ 
    try{ 
        const product = await Product.find({}).populate({
            path: 'brand',
            select: 'name'
        }).populate({
            path: 'category',
            select: 'slug name'
        })   
        res.status(200).json({product} )
    }catch(err){
        res.json({err})
    }
}
exports.getProductById = async(req, res, next)=>{
    try{
        const {slug} = req.params;
        const product = await Product.findOne({slug:slug}).populate({
              path: 'brand',
              select: 'name'
          }).populate({
              path: 'category',
              select: 'slug name'
          })
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
 
exports.updateOneProduct = async (req, res, next) => {
    try {
      const slug = req.params.slug;
      const brandId = req.body.brand;
      const cateID = req.body.category;


      const product = await Product.findOne({ slug });

      if (brandId) {
        const brand = await Brand.findById(brandId);
        if (!brand) {
          return res.status(404).json({
            status: 'error',
            message: 'Brand not found'
          });
        }
        const existingBrand = product.brand === brandId;
        if (existingBrand) {
          return res.status(400).json({
            status: 'error',
            message: 'Brand already exists for this product'
          });
        }
      }
      // Gán giá trị brandId cho product.brand sau khi kiểm tra sự tồn tại
      product.brand = brandId;

      if(cateID){
        const category = await Category.findById(cateID); 
        if (!category) {
          // Xử lý khi không tìm thấy category
          return res.status(404).json({
            status: 'error',
            message: 'Category not found'
          });
        }
        const existingCategory = product.category.find((categoryId) => categoryId.toString() === cateID);
        if (existingCategory) {
          // Xử lý khi ID danh mục đã tồn  tại trong mảng danh mục (category)
          return res.status(400).json({
            status: 'error',
            message: 'Category already exists for this product'
          });
        }


        product.category.push(cateID); // Thêm giá trị mới vào mảng danh mục (category) của sản phẩm  
        
      }
      const updatedProduct = await product.save();  
      
      if (!product) {
        // Xử lý khi không tìm thấy product
        return res.status(404).json({
          status: 'error',
          message: 'Product not found'
        });
      }
  
 
 
      res.status(200).json({
        status: 'success',
        data: { product: updatedProduct }  
      });
    } catch (error) { 
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  };
  



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