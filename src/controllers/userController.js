const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const {nanoid} = require('nanoid')

exports.getAllUsers = async(req, res, next)=>{
    const page = parseInt(req.query.page) -1|| 0;
    const limit = parseInt(req.query.limit) || 5;
    const total = await User.countDocuments();
    const totalPage = Math.ceil(total / limit)
    const email = req.query.email;
    try{
        let users;
        if(email){
            users= await User.find({email});
            res.status(200).json({users});
        }else{
            users = await User.find({});
            res.status(200).json({page: page + 1,totalPage: totalPage ,totalItem :total,limit: limit ,users} )
        }
    }catch(error){
        res.json(error)
    }
} 
exports.getUserByEmail = async(req, res, next)=>{
    try{
        const {email} = req.params;
        const users = await User.findOne(email);
        res.status(200).json({
            status:'success',
            data:{users}
        })
    }catch(error){
        res.json(error)
    }
} 
exports.createOneUser = async(req, res, next)=>{
    try{
        const genPass = nanoid(10)
        const hashPassword = bcrypt.hashSync(genPass, 10)
        if(req.body.facebookId || req.body.googleId){
            const user = await User.create({...req.body, password:hashPassword});
            const token = jwt.sign({userIdd:user._id}, process.env.APP_SECRET);
            res.status(200).json({
                status:'success',
                data:{token, userName: user.name,avatar: user.avatar.url}
            })
        }
        const user = await User.create(req.body);
        const token = jwt.sign({userIdd:user._id}, process.env.APP_SECRET);
        res.status(200).json({
            status:'success',
            data:{token, userName: user.name,avatar: user.avatar.url}
        })
    }catch(error){
        next(error);
    }
}
exports.resetPassword = async(req, res, next)=>{
    try{
    //   "https://hstore.netlify.app"
        const {email} = req.body;
        const oldUser = await User.findOne({email})
        if(!oldUser){
            res.status(400).json({
                'message':'User not found'
            })
        }
        const secret = process.env.APP_SECRET + oldUser.password;
        const token = jwt.sign({email:oldUser.email,id:oldUser._id}, secret,{
            expiresIn:"5m",
        });
        const link = `https://localhost:3000/reset-password/${oldUser._id}/${token}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure:true,
        auth: {
            user: 'hstore.noreply@gmail.com',
            pass: 'evuldqouqqsmxfel'
        }
    });
    const mailOptions = {
        from: 'hstore.noreply@gmail.com',
        to: oldUser.email,
        subject: 'Password Reset',
        text: `Xin chào ${oldUser.name}. Chúng tôi nhận được yêu cầu đặt lại mật khẩu HSTORE của bạn.Nhấp vào đường dẫn này để đổi: `+link
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
    }catch(error){
        console.log(error);
    }
}
exports.checkResetPassword = async(req, res, next)=>{
    try{
        const {id, token} = req.params;
        const oldUser = await User.findOne({id})
        if(!oldUser){
            res.status(400).json({
                'message':'User not found'
            })
        }
        // const secret = process.env.APP_SECRET + oldUser.password;
        // const verify = jwt.verify(token, secret)
        res.status(200).json({
            'message':'success'
        })
    }catch(error){
        console.log(error);
        res.status(400).json({'message':'Not verify'})       
    }
}
exports.confirmResetPassword = async(req, res, next)=>{
    try{
        const {id, token} = req.params;
        const {password} = req.body;
        const oldUser = await User.findOne({id})
        if(!oldUser){
            res.status(400).json({
                'message':'User not found'
            })
        }
        // const secret = process.env.APP_SECRET + oldUser.password;
        // const verify = jwt.verify(token, secret)
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await User.findByIdAndUpdate(
            {_id: id},
            {...req.body,password : hashPassword},
            { new: true , runValidator: true}
        )
        res.status(200).json({
            "message":"success",
            data:{user}
        })
    }catch(error){
        console.log(error);
        res.status(400).json({'status':'Something went wrong'})       
    }
} 
exports.updateOneUser = async(req, res, next)=>{
    try{
        const email = req.query;
        const {password} = req.body; 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)  
        const user = await User.findOneAndUpdate(
            email,
            {...req.body,password : hashPassword},
            { new: true , runValidator: true}
        )
        res.status(200).json({
            status:'success',
            data:{user},
        }) 
    }catch(error){
        res.json(error);
    }
} 
exports.deleteOneUser = async(req, res, next)=>{
    try{
        const email = req.query;
        await User.findOneAndDelete(email);
        res.status(200).json({
            status: 'success',
            message: 'User has been deleted'
        })
    }catch(error){
        res.json(error)
    }
} 
exports.getUserWishlist = async(req, res, next)=>{
    try{
        const email = req.query;   
        const user = await User.findOne(email).populate({
            path:'wishlist',
            select:'name price image'
        })
        res.status(200).json({
            status:'success',
            data:user,
        }) 
    }catch(error){
        res.json(error);
    }
} 
exports.updateUserWishlistItem = async(req, res, next)=>{
    try{
        const email = req.query.email;
        const productId = req.params.prodId;  
        // Kiem tra user ton tai
        const user = await User.findOne({email})
        const userId = user._id.toString(); 
        if(user !== null){
            // kiem tra productId da ton tai
            const existedItem = user.wishlist.filter(i => i.toString() === productId)
            if(existedItem.length === 0){ 
                const userUpdated = await User.findByIdAndUpdate(
                    {_id:userId},
                    {$push:{wishlist:productId}},
                    { new: true , runValidator: true}
                )
                res.status(200).json({
                    status:'success', 
                    data:userUpdated
                })  
            }
            else{
                res.status(404).json({
                    status:'fail', 
                    msg:'product existed!'
                }) 
            }
        }
        else{
            res.status(404).json({
                status:'fail', 
                msg:'user not found!'
            })  
        }

    }catch(error){
        res.json(error);
    }
} 
exports.updateUserWishlist = async(req, res, next)=>{
    try{
        const email = req.query.email; 
        const userUpdated = await User.findOneAndUpdate(
            {email:email},
            { wishlist: req.body.wishlist},
            { new: true , runValidator: true}
        )
        if(!userUpdated){
            res.status(404).json({
                status:'Fail', 
                msg:'User not found'
            })    
        }else{ 
            const user = await User.findOne({email}).populate({
            path:'wishlist',
            select:'name price image'
        })
            res.status(200).json({
                status:'success', 
                data:user
            })   
        }   
    }catch(error){
        res.json(error);
    }
} 
exports.deleteUserWishlist = async(req, res, next)=>{
    try{
        const email = req.query.email;
        const productId = req.params.prodId; 
        // Kiểm tra sp tồn tại chưa  
        // const userUpdated = await User.findOneAndUpdate(
        //     {email,wishlist:productId.toString()},
        //     {$pull:{wishlist:productId}}, 
        //     { new: true , runValidator: true}
        // )
        // res.status(200).json({
        //     status:'success',
        //     data:userUpdated,
        // })    
        const user = await User.findOne({email}) 
        const userId = user._id.toString()
        if(user !== null){
            // kiem tra productId da ton tai
            const existedItem = user.wishlist.filter(i => i.toString() === productId)
            if(existedItem.length !== 0){
                const userUpdated = await User.findOneAndUpdate(
                    {_id:userId},
                    {$pull:{wishlist:productId}}, 
                    { new: true , runValidator: true}
                )
                res.status(200).json({
                    status:'success', 
                    data:userUpdated
                })  
            }
            else{
                res.status(404).json({
                    status:'fail', 
                    msg:'product not existed!'
                }) 
            }
        }
        else{
            res.status(404).json({
                status:'fail', 
                msg:'user not found!'
            })  
        } 
    }catch(error){
        res.json(error);
    }
} 