const express=require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/userauth.routes")
require('dotenv').config()
const {postRouter}=require("./routes/post.routes")
const cors=require("cors")
const {accessMiddleware}=require("./middleware/posts.middleware")
const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("welcome")
    console.log("homepage")
})
app.use("/users",userRouter)
app.use(accessMiddleware)
app.use("/posts",postRouter)
app.listen(process.env.PORT,async()=>{
    try{
await connection
console.log(`port ${process.env.PORT} is running`)
    }catch(err){
console.log(err.message)
    }
})