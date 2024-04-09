const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
const secretKey = process.env.JWT_Secret || ''
const {tokenBlackList} = require('../app')
const UnauthorisedException = require('exception/UnauthorizedException')
const globalExceptionHandler = require('exception/GlobalExceptionHandler')

const authVerification = async (req,res,next)=>{
    const token = extractTokenFromRequest(req);
    if (!token){
        return res.status(401).json({message: 'Authorization token required'})
    }
   if (tokenBlackList.has(token)){
       return res.status(401).json({message:'Invalid orExpired token'})
   }
   try {
       jwt.verify(token , secretKey ,(error ,decode)=>{
           if (error){
               throw new UnauthorisedException('Invalid or Expired');
           }
           req.user = decoded.user
           console.log(decoded);
           next()
       })

   }catch (error){
      await globalExceptionHandler(error,res)
   }
}
function  extractTokenFromRequest(req){
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')){
        return authHeader.substring(7)
    }
    return null;
}
module.exports = authVerification;

