const mongoose = require("mongoose");


const RestaurantSchema = new mongoose.Schema({
user_id:{type:mongoose.Types.ObjectId,ref:"User"},
name:String,
description:String,
rating:Number
},{timestamps:true,versionKey:false})

const Restaurant = mongoose.model("Restaurant",RestaurantSchema);

module.exports=Restaurant