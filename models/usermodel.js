
const mongoose = require("mongoose");

const userSchema =  mongoose.Schema({
    id:Number,
    name:String,
    password:String,
    age:Number,
    hobby:[String]
});

const userModel = mongoose.model("user",userSchema,"user");

module.exports=userModel;