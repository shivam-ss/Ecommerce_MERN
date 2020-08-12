const express=require("express");
const router=express.Router();

//only admin can creatge categories: 
const { requireSignin ,isAuth, isAdmin }=require("../controllers/auth"); 
const {userById}=require("../controllers/user");


const {create }=require("../controllers/category"); //now, we will be handling our logic in controller
const {userSignUpValidator}= require("../validator/index")



router.post("/category/create/:userId",requireSignin, isAuth, isAdmin, create);


router.param("userId",userById); 
module.exports=router;

