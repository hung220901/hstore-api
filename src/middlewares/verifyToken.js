
const jwt = require('jsonwebtoken');


exports.verifyToken = (req,res,next)=>{
    const token = req.headers.token;
    if(token){
        const accessToken =  token.split(" ")[1];
        jwt.verify(accessToken, process.env.APP_SECRET,(err,user)=>{
            if(err){
                res.status(403).json("Token is not valid")
            }
            req.user = user; 
            next()
        })
    }
    else{
        res.status(401).json("Unauthorized!")
    }
}
exports.verifyAndAdminAuth = (req, res, next)=>{ 
    this.verifyToken(req,res,()=>{
        if(req.user.role === 'Admin'){
            next()
        }
        else{
            res.status(403).json({
                "msg":"You're not allow to do that!"
            })
        }
    }) 
}
