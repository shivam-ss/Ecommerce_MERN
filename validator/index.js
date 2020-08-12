exports.userSignUpValidator=(req,res, next)=>{
    req.check("name","name is required !!!").notEmpty()
    req.check("email","email must be above 6 charctares")
       .matches(/.+\@.+\..+/)
       .withMessage("email must contain @")
       .isLength({
           min: 4,
           max: 32
       });
    req.check("password","password is required !!!").notEmpty()
    req.check("password")
    .isLength({min:6})
    .withMessage("Password must have atleast 6 characters")


    const errors=req.validationErrors()
    if(errors){
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError});
    }
    
    next(); 
};