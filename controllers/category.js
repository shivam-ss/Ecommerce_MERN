const Category=require("../models/category");
const {errorHandler} = require ("../helper/DBerrorHandler")


exports.create=(req,res)=>{
    const category=new Category(req.body);
    category.save((err,data)=>{
        if(err){
            res.status(400).json({
                    error: errorHandler(err)
            
            })

        }
        res.json({ data});
        

    })
}