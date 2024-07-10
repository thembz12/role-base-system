const mongoose = require ("mongoose")

const thembzSchema = new mongoose.Schema({
fullname:{
    type:String, 
    require:true,
    trim:true
},
email:{
    type:String, 
    require:true, 
    unique:true, 
    trim:true
},
password:{
type:String, 
require:true
},
score:{
    html:{type:Number},CSS:{type:Number},javascript:{type:Number},remark:{type:String}},
isAdmin:{type:Boolean, default: false}
},{timestamps:true})

const userModel = mongoose.model("baserole", thembzSchema)
module.exports = userModel
