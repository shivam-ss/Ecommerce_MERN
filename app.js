const express=require("express");
const mongoose=require("mongoose");

const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
const categoryRoutes=require("./routes/category");
const productRoutes=require("./routes/product");


const morgan=require("morgan");   // we will use it handle middleware
const bodyParser=require("body-parser"); 
const cookieparser=require("cookie-parser");


//validating entered creds:
const expressValidator=require("express-validator");

require("dotenv").config(); //takes the env 


const app=express();









mongoose.connect(
    process.env.DATABASE,
    {
    useNewUrlParser: true,
    useCreateIndex: true

}

).then(()=>console.log("connected to local mongoDB"));




//middleware:
app.use(morgan('dev'));
app.use(bodyParser.json()); 
app.use(cookieparser());
app.use(expressValidator());
app.use(express.urlencoded({ extended: false }))






// taking from authuser.js

app.use("/api",authRoutes);
app.use("/api",userRoutes);  // in case user goes from URL
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);










const port = process.env.PORT || 3000; // if we dont have env file, 800 will be use

app.listen(port,() =>{
    //console.log('server running at port  ${port}' );
});
