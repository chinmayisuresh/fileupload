const express=require('express');
const productsController=require('./controllers/single.controller');
const mproductsController=require('./controllers/multiple.controller');

const app=express();
app.use(express.json());

app.use("/products",productsController);
app.use("/mproducts",mproductsController);

const connect=require('./config/db.js');

app.listen(2347,async()=>{
    await connect();
    console.log('listening on 2347');
})