const jwt=require("jsonwebtoken")
 function accessMiddleware(req,res,next){
    const token=  req.headers.authorization
    console.log(token,"is token")
    const dec= jwt.verify(token,"masaikey",(err,decode)=>{
        if(err){
            res.send("invalid token")
            console.log(err.message,"is error message")
        }else{
            next()
        }
    })
}
module.exports={accessMiddleware}