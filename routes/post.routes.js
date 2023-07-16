const {Router}=require("express")
const {postModel}=require("../models/post.model")
const postRouter=Router()
postRouter.post("/add",async(req,res)=>{
    const {title,content}=req.body
    console.log(title,content)
  try{
   const postit= await postModel.create({title,content,user_id:req.user_id})
   console.log(postit) 
   await postit.populate("user_id")
   return res.status(201).send(postit)
  }catch(err){
    console.log(err.message)
    res.send(`400:{error:${err.message}}`)
  }
})
postRouter.get("/get",async(req,res)=>{
    const {title}=req.query
  try{
  const getPosts= await postModel.find()
   console.log(getPosts) 
   res.send(`200:${getPosts}`)
  }catch(err){
    console.log(err.message)
    res.send(`400:{error:${err.message}}`)
  }
})
postRouter.get("/search",async(req,res)=>{
try{
  const {searchQuery}=req.query
  const posts=new RegExp(searchQuery,"i")
const getPosts= await postModel.find({title:posts})
 console.log(getPosts) 
 res.status(201).send(`${getPosts}`)
}catch(err){
  console.log(err.message)
  res.send(`400:{error:${err.message}}`)
}
})
postRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    const postingUser= await postModel.find({_id:id})
    console.log(postingUser,"is post")
      const user_id_request=req.user_id.toString()
      console.log(user_id_request)
      console.log(postingUser[0].user_id.toString()===user_id_request,"boolean value")
  try{
    if(postingUser[0].user_id.toString()===user_id_request){
      const postit= await postModel.updateOne({_id:id},req.body)
      const updatedPost=await postModel.findById({_id:id})
    console.log(postit) 
    res.send(`200:{msg:"Post added"},${updatedPost}`)
    }else{
      res.send("you are not authorised")
    }
  }catch(err){
    console.log(err.message)
    res.send(`400:{error:${err.message}}`)
  }
})
postRouter.patch("/likes/:id",async(req,res)=>{
  try{
    // const post=await postModel.findById(req.params.id)
    const post=await postModel.find({_id:req.params.id})
    console.log(post,"is post")
    // const index=post.likes.findIndex(id=>id===String(req.user_id))
    const index=post[0].likes.includes(String(req.user_id))

    // if(index===-1){
      if(!index){
      post[0].likes.push(req.user_id)
    }else{
     post[0].likes=post[0].likes.filter(id=>id!==String(req.user_id))
      console.log(post[0].likes.filter(id=>id!==String(req.user_id)),"is filtered one")
    }
    console.log(index,"is index")
    // const updatedPost=await postModel.findByIdAndUpdate(req.params.id,post,{new:true})
    const updatedPost=await postModel.updateOne({_id:req.params.id},{$set:{likes:post[0].likes}})
    res.send(post)
  }catch(err){
  console.log(err.message)
  res.send(`400:{error:${err.message}}`)
}
})
postRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    console.log(id)
   const deletingOne= await postModel.find({_id:id})
   console.log(deletingOne)
   console.log(req.user_id)
  try{
    if(req.user_id===deletingOne[0].user_id.toString()){
      const postit= await postModel.deleteOne({_id:id}) 
      console.log(postit)
      res.send(`200:{message:"post deleted"}`)
    }else{
      res.send("you are not authorized")
    }
  }catch(err){
    console.log(err.message)
    res.send(`400:{error:${err.message}}`)
  }
})

module.exports={postRouter}