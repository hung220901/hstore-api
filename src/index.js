require('dotenv').config(); 
const express = require('express');
const app = express(); 
const cors = require('cors');
const path = require('path');
app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname,'public'))) 
const {errorHandler} = require('./middlewares/errorHandle');
const {connectDB} = require('./configs/db')
connectDB(); 
app.use(errorHandler);



app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Request-Width, Content-Type, Accept, Authorization'
    );
    res.setHeader('Allow-Control-Allow-Methods','GET, POST, PUT, DELETE');
    next();
}); 

const authRoute = require('./routes/authRoute');  
const productRoute = require('./routes/productRoute');   
app.use('/api/v1/auth', authRoute);  
app.use('/api/v1/product', productRoute);  


app.all('*',(req, res ,next)=>{
    const err = new Error('The route cant not be found');
    err.statusCode = 404;
    next(err);
})  
const port = process.env.PORT || 5000; 
 app.listen(port, ()=>{
     console.log(`Server is running on port ${port}`);
 }) 
