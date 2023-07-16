const jwt=require("jsonwebtoken")
 function accessMiddleware(req,res,next){
    const token= req.headers.authorization
    console.log(token,"is token")
    const decoded=jwt.verify(token,"masaikey")
    console.log(decoded)
    if(decoded){
        req.user_id=decoded.user_Id
        next()
    }else{
        res.send("invalid token")
    }
}
module.exports={accessMiddleware}