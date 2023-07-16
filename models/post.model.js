const mongoose=require("mongoose")
const postSchema=mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    likes:{type:[String],default:[]},
    comments:{type:[String],default:[]}
})
const postModel=mongoose.model("posts",postSchema)
module.exports={postModel}