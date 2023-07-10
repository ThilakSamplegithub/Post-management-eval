const mongoose=require("mongoose")
const connection=mongoose.connect("mongodb+srv://thilak:thilak@cluster0.x26ugdw.mongodb.net/postsdb?retryWrites=true&w=majority")
module.exports={connection}