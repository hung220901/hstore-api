const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');


exports.register = async(req,res,next) =>{
    try{
        // Kiểm tra đăng nhập  bằng social thì sẽ tự gen pass
        const { name, email, googleId, facebookId } = req.body;
        // generate password nếu social login
        const genPass = nanoid(10) 
        // Kiểm tra user đã tồn tại chưa 
        let existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Kiểm tra nếu dăng ký social thì tạo mới
        if(googleId){
            const user = await User.create({ email, name, password: genPass,googleId,provider:'google' }) 
            const token = jwt.sign({userId:user._id}, process.env.APP_SECRET);
            res.status(200).json({
                status:'success',
                data:{token, userName: user.name}
            }) 
        }
        else if(facebookId){
            const user = await User.create({ email, name, password: genPass,facebookId,provider:'facebook' })
            const token = jwt.sign({userId:user._id}, process.env.APP_SECRET);
            res.status(200).json({
                status:'success',
                data:{token, userName: user.name}
            }) 
        }
        else{
            // normal register 
            const user = await User.create(req.body)
            const token = jwt.sign({userId:user._id}, process.env.APP_SECRET);
            res.status(200).json({
                status:'success',
                data:{token, userName: user.name}
            })  
        } 
    }
    catch(error){
        next(error);
    }
}
exports.login = async(req,res,next) =>{
    try{
        const {email, password , googleId, facebookId,provider} = req.body;
        let user = null;
        const existingUser = await User.findOne({ email }); 
        if(provider === 'google'){ 
            if(existingUser.provider !== provider){
                return res.status(401).json({ message: 'Email existed! Please use another login method' });
            }
            user = await User.findOne({googleId})  
        } 
        else if(provider === 'facebook'){
            if(existingUser.provider !== provider){
                return res.status(401).json({ message: 'Email existed! Please use another login method' });
            }
            user = await User.findOne({facebookId}) 
        }
        else{
            user = await User.findOne({email})
            if(!user){
                return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password)
            if(!passwordMatch){
                return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' }); 
            }
        } 
        const token = jwt.sign({userId: user._id}, process.env.APP_SECRET); 
        res.status(200).json({
            status:'success',
            data:{token, userName: user.name, role: user.role, avatar:user.avatar,email:user.email}
        })
 
    }
    catch(error){
        next(error);
    }
} 
exports.getCurrentUser = async (req, res, next) =>{
    try {
        const data = {user: null}
        if(req.user){
            const user = await User.findOne({_id: req.user.userId});
            data.user = { userName: user.name, role: user.role,avatar:{url:user.avatar.url},email:user.email}
        }
        res.status(200).json({
            status:'success',
            data: data
        })
    } catch (error) {
        res.json(error)        
    }
}