
const jwt = require('jsonwebtoken');


exports.verifyToken = (req,res,next)=>{
    const token = req.headers.token;
    if(token){
        const acessToken =  token.split(" ")[1];
        jwt.verify(acessToken, process.env.APP_SECRET,(err,user)=>{
            if(err){
                res.status(403).json("Token is not valid")
            }
            res.user = user;
            next()
        })
    }
    else{
        res.status(401).json("Unauthorize!")
    }
}
exports.verifyAndAdminAuth = (req, res, next)=>{ 
    this.verifyToken(req,res,()=>{
        if(req.user.id == req.params.id || req.user.role === "admin"){
            next()
        } 
        else{
            req.status(403).json("You're not allowed to do that")
        }
    });
}
