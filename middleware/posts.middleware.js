const jwt=require("jsonwebtoken")
async function accessMiddleware(req,res,next){
try{
    const token= await req.headers.Authorization
    const dec= jwt.verify(token,"masaikey",(err,decode)=>{
        if(decode){
        next()
        }else{
           res.send(err.message)
        }
    })
    if(dec){
        next()
    }
}catch(err){
console.log(err.message)
}

}
module.exports={accessMiddleware}