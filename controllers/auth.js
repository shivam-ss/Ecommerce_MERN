const User=require("../models/user")
const {errorHandler}= require ("../helper/DBerrorHandler")

const jwt=require("jsonwebtoken"); // it will be used too generate signed token
const expressJWT=require("express-jwt"); //for authz check







exports.signup=(req,res)=>{
    console.log(req.body);
   const user=new User(req.body)
   user.save((err, user)=>{
    if(err){
        return res.status(400).json({
            err: errorHandler(err)
        })
        user.salt=undefined;
        user.hash_pass=undefined;
    }
    res.json({
        user
    })
   })
}
/* ------------------------------------------------------------------------------------------- */



exports.signin=(req,res)=> {
    const {email,password}=req.body
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                err: "email doesnt exist"
            });
        }

            // if user found, check if email and apss match
            //we will hash the password and check it and match it with the database
            // we will be creating userauthenicate model

            // if user exists, then we will be generating a token 


            if(!user.authenticate(password)){
                    return res.status(401).json({
                        error: "password error"
                    });
            }
           

            const token=jwt.sign({_id: user._id},process.env.JWT_SECRET)  //from env file

            // once  we have token, name it "t" in cookie with ecpiry date

            res.cookie("t",token,{expire:new Date()+8888})

            //now, return response with user and token to frontend client
            const{_id, name, email, role}=user;
            return res.json({token, user:{_id, email, name, role}})


        }
    )
    }
    

    //////////////////////////////////////////

    exports.signout=(req,res)=>{
        res.clearCookie("t");
        res.json({message: "signout success"});
    }


    ///////////////////  PROTECTING OUR PATHS FOR ONLY SIGNED IN USERS ///////////////////

    exports.requireSignin= expressJWT({
        secret: "wokdnfnnkwek",
        algorithms: ["HS256"],
        userProperty: "auth"
    });




    exports.isAuth=(req,res,next) =>{
        let user= req.profile && req.auth && req.profile._id ==req.auth._id;

        if(!user){
            return res.status(403).json({
                error: "Access denied, you arent the user"
            })
        }
        next();

    }


    exports.isAdmin= (req,res,next) => {
        if(req.profile.role === 0){
            return res.status(403).json({
                    error: "admin account !!!!!!!!! access denied"
            })
        }

        next();
    }

    