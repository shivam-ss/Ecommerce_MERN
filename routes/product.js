const express=require("express");
const router=express.Router();

//only admin can creatge categories: 
const { requireSignin ,isAuth, isAdmin }=require("../controllers/auth"); 
const {userById}=require("../controllers/user");


const { create, productById, read, remove}=require("../controllers/product"); //now, we will be handling our logic in controller
//const {userSignUpValidator}= require("../validator/index")



router.get("/product/:productId", read);  //read will be read
router.delete("/product/:productId/:userId", remove, isAdmin, requireSignin, isAuth)


router.post("/product/create/:userId",requireSignin, isAuth, isAdmin, create);  //call create whenevr these conditions met


router.param("userId",userById); 
router.param("productId",productById);



module.exports=router;

