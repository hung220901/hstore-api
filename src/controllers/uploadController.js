const Image = require('../models/Image')


exports.upload =(req,res,next)=>{
    console.log(req.body)
    res.status(200).send('successfully')
}