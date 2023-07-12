require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const cors = require('cors');
const path = require('path');
const {errorHandler} = require('./middlewares/errorHandle');
const {connectDB} = require('./configs/db')
connectDB(); 
app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname,'public'))) 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader( 'Access-Control-Expose-Headers', 'Content-Range')
    res.setHeader('Content-Range', 'product 0-20/20');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Request-Width, Content-Type, Accept, Authorization'
    ); 
    res.setHeader('X-Total-Count','10')
    res.setHeader('Allow-Control-Allow-Methods','GET, POST, PUT, DELETE');
    next();
}); 

const authRoute = require('./routes/authRoute');  
const productRoute = require('./routes/productRoute');   
const categoryRoute = require('./routes/categoryRoute');   
const brandRoute = require('./routes/brandRoute');   
const userRoute = require('./routes/userRoute');    
const cartRoute = require('./routes/cartRoute');   
const payRoute = require('./routes/payRoute')
const imageRoute = require('./routes/imageRoute')
const reviewRoute = require('./routes/reviewRoute')
const orderRoute = require('./routes/orderRouter');    



app.use('/api/v1/auth', authRoute);  
app.use('/api/v1/product', productRoute);  
app.use('/api/v1/category', categoryRoute);  
app.use('/api/v1/brand', brandRoute);  
app.use('/api/v1/user', userRoute);   
app.use('/api/v1/images', imageRoute);   
app.use('/api/v1/cart', cartRoute);  
app.use('/api/v1/checkout',payRoute)
app.use('/api/v1/review',reviewRoute)
app.use('/api/v1/order', orderRoute);   


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
