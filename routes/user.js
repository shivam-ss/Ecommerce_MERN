/// it is  middleware:

const express=require("express");
const router=express.Router();


// but we also need the user to be signed in, so:
const { requireSignin ,isAuth, isAdmin }=require("../controllers/auth"); 

const {userById}=require("../controllers/user"); //now, we will be handling our logic in controller

//const {productById}=require ("../controllers/product");



router.get("secret/:userId", requireSignin, isAuth, isAdmin, (req,res)=>{
    res.json({
        user: req.profile
    })
})

router.param("userId",userById); // whenever there is userId in URL, it will redirect to profile informaton

//router.param("productId",productById); // we need productById whenever there is 


module.exports=router;

