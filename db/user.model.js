const  mongoose = require("mongoose");
const validator= require('validator')
const userSchema = new mongoose.Schema({
    username : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate : [validator.isEmail , "filed must be a vaild Email"]
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String, // ['user' , 'admin' , 'manger']
        enum : ["user" , "admin"],
        default : "user"
    },
   
})

module.exports = mongoose.model("User" , userSchema)