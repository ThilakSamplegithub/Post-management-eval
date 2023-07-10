const {Router}=require("express")
const {postModel}=require("../models/post.model")
const postRouter=Router()
postRouter.post("/add",async(req,res)=>{
    const payload=req.body
  try{
   const postit= await postModel.create(payload)
   console.log(postit) 
   res.send(`200:{msg:"Post added"},${postit}`)
  }catch(err){
    console.log(err.message)
    res.send(`400:{error:${err.message}}`)
  }
})
postRouter.get("/get",async(req,res)=>{
    const {title}=req.query
  try{
  const getPosts=postModel.find({title})
   console.log(getPosts) 
   res.send(`200:${getPosts}`)
  }catch(err){
    console.log(err.message)
    res.send(`400:{error:${err.message}}`)
  }
})
postRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
  try{
   const postit= await postModel.updateOne({id:_id},req.body)
   console.log(postit) 
   res.send(`200:{msg:"Post added"},${postit}`)
  }catch(err){
    console.log(err.message)
    res.send(`400:{error:${err.message}}`)
  }
})
postRouter.post("/delete/:id",async(req,res)=>{
    const {id}=req.params
  try{
   const postit= await postModel.deleteOne({_id:id})
   res.send(`200:{message:"post deleted"}`)
  }catch(err){
    console.log(err.message)
    res.send(`400:{error:${err.message}}`)
  }
})

module.exports={postRouter}