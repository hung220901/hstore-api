const multer = require('multer')

const storage = multer.diskStorage({
    // destination: function(req,file,cb){
    //     cb(null,'./uploads')
    // },
    filename:function(req,file,cb){
        const ext = file.originalname.substring(file.originalname.lastIndexOf('.'));  
        cb(null, file.originalname.substring(0,file.originalname.lastIndexOf('.')) + '-'+Date.now()+ext)
    },
});

module.exports = store = multer({storage:storage})

