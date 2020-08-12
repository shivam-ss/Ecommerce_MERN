const express=require("express");
const router=express.Router();


const {signup, signin, signout, requireSignin }=require("../controllers/auth"); //now, we will be handling our logic in controller
const {userSignUpValidator}= require("../validator/index")



router.post("/signup", userSignUpValidator, signup);

router.post("/signin",signin);

router.get("/signout",signout);


router.get("/hello",requireSignin, (req,res)=>{
    res.send(" hello user");
});



module.exports=router;

