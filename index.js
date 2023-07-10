const express=require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/userauth.routes")
const {postRouter}=require("./routes/post.routes")
const {accessMiddleware}=require("./middleware/posts.middleware")
const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("welcome")
    console.log("homepage")
})
app.use("/users",userRouter)
app.use(accessMiddleware)
app.use("/posts",postRouter)
app.listen(4500,async()=>{
    try{
await connection
console.log(`port 4500 is running`)
    }catch(err){
console.log(err.message)
    }
})