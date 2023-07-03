const jwt = require('jsonwebtoken')

exports.checkCurrentUser = (req, res, next) => { 
    const Authorization = req.headers.token;
    if(!Authorization){
        req.user = null;
        next();
    }
    else{
        const token = Authorization.split(" ")[1];
        try {
            const {userId} = jwt.verify(token, process.env.APP_SECRET);
            req.user = {userId};
            next();
        } catch (err) {
            req.user = null;
            next();
        }
    }
}