const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1=require("uuidv1"); //we need unique values

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        trim: true,  // l and r trim
        required: true,
        maxlength: 32
    },

    email:{
        type: String,
        trim: true,  // l and r trim
        required: true,
        unique: 32
    },

    hashed_pass:{
        type: String,
        trim: true,  // l and r trim
        required: true
    },

    about :{
        type: String,
        trim: true,  // l and r trim
    },
    salt: String,  // will use it later  to generate hashed password

    role:{                              // normal user or admin
        type: Number,
        default: 0
    },

    history:{
        type: Array,
        default: []
    }




}, 
{timestamp: true}

)


// virtual field:

userSchema.virtual("password")
.set(function(password){   // taking the password frm the client side: 

    this._password=password;   // temporary variable
    this.salt=uuidv1; // it will give us a random string, it will be used to hash the password

    this.hashed_pass=this.encryptPassword(password);


})

.get(function(){
    return this.password;
})

userSchema.methods={

    authenticate: function(plainText){
            return this.encryptPassword(plainText)===this.hashed_pass;  // either true or false
    },


    encryptPassword: function(password){
        if(!password)
        return;

       // else  // rmeove it if doesnt work
        try{
            return crypto.createHmac("sha1",this.salt)
                            .update(password)
                            .digest("hex")
        }
        catch(err){
            return "";
        }
    } 
}

module.exports=mongoose.model("User", userSchema);