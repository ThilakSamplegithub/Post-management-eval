const {Router}=require("express")
const{userModel}=require("../models/userauth.model")
const userRouter=Router()
const jwt=require("jsonwebtoken")
userRouter.post("/register",async(req,res)=>{
    const payload=req.body
 try{
    const userData= await userModel.create(payload)
  console.log(userData)
  res.send(`200:{
    msg:"The new user has been registered",
    registeredUser:${userData}
  }`)
}catch(err){
    console.log(err.message)
    res.send(`400:{
        error:${err.message}
    }`)
 }
})
userRouter.post("/login",async(req,res)=>{
   const {email,pass}=req.body
   try{
    const loggedUser=await userModel.find({email,pass})
    if(loggedUser.length>0){
       const token=jwt.sign({email,pass},"masaikey")

        console.log(loggedUser,"is logged user")
        res.send(`200:{msg:"Login successful!",token:${token}}`)
    }else{
        res.send("Invalid login details")
    }
   }catch(err){
   console.log(err.message)
   res.send(err.message)
   }
})
module.exports={userRouter}
