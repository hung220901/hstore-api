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
const categoryRoute = require('./routes/categoryRoute');   
const collectionRoute = require('./routes/collectionRoute');   
const cartRoute = require('./routes/cartRoute');   
const orderRoute = require('./routes/orderRouter');    
const userRouter = require('./routes/userRoute');    
app.use('/api/v1/auth', authRoute);  
app.use('/api/v1/product', productRoute);  
app.use('/api/v1/category', categoryRoute);  
app.use('/api/v1/collection', collectionRoute);  
app.use('/api/v1/cart', cartRoute);  
app.use('/api/v1/order', orderRoute);   
app.use('/api/v1/user', userRouter);   


app.all('*',(req, res ,next)=>{
    const err = new Error('The route cant not be found');
    err.statusCode = 404;
    next(err);
})  
app.use(errorHandler);

const port = process.env.PORT || 5000; 
 app.listen(port, ()=>{
     console.log(`Server is running on port ${port}`);
 }) 
