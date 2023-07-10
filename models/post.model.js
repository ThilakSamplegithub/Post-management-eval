const mongoose=require("mongoose")
const postSchema=mongoose.Schema({
    title:String,
    content:String
})
const postModel=mongoose.model("posts",postSchema)
module.exports={postModel}