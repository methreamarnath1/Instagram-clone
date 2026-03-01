const mongoose = require("mongoose"); 

const postSchema = new mongoose.Schema({
    caption:{type:String,required:true,
        default:""},
    imageUrl:{type:String,required:[true, "image url is required"]},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
    createdAt:{type:Date,default:Date.now}
})
     
const postModel = mongoose.model("posts",postSchema)

module.exports = postModel;