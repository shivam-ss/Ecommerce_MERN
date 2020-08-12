const formidable=require("formidable");
const _ =require("lodash");  // see what does it mean

const fs = require("fs")   // accessing filesystem

const Product=require("../models/product");
const {errorHandler} = require ("../helper/DBerrorHandler")






//we are appending prductId in url
exports.productById = (req, res, next, id) =>{

    

    Product.findById(id)
    .populate("category")
    .exec((err,product) => {
        if(err || !product){
            return res.status(400).json({
                err: " Product not found"
            })
        }

        else{
            req.product = product;

        }

        next();
    })
}

  exports.read = (req,res)=>{
      
        req.product.photo = undefined;  //size is huge
        return res.json(req.product); 

  }


  exports.remove=(req,res)=> {
        let product=req.product;
        product.remove((err,success) => {
            if(err){
                return res.status(400).json({
                    err: " Product not found"
                })
            }
            else{
                res.json({
                    success,
                    "message": "product has been deleted successfully"
                })
            }
        })

  }










exports.create=(req,res)=>{
    // we need to handle the image also, so we will be installing and using formidable and lodash


    let form=new formidable.IncomingForm(); //all the data coming will be available via this
    form.keepExtensions=true ;  //whatever img type we get it will remains as it is
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image cant be uploaded to database"
            })


        }

        //checking if user has given all the fields:
        const {name, description, price, category, quantity, shipping} =fields;  //fields will ad these values to json
        
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: "All fields mandatory, except shipping"
            })
        }

        //else
            let product=new Product(fields)
            if(files.photo){

                //checking size, should be less than 1MB:
                if(files.photo.size>1000000){
                    return res.status(400).json({
                        error: "Image cant be uploaded to database, size too large"
                    })
                }

                product.photo.data = fs.readFileSync(files.photo.path);
                product.photo.contentType= files.photo.type;
            }
        

        product.save((err, success) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler
                });

            }

            else{
                res.json(success);
            }
           })

       // };   //first else ends here, removed it, code became too complicated
    })


};