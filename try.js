const userModel = require ("require")
const jwt = require ("jsonwebtoken")


exports.authorization = async (req,res,next)=>{
    try {
        const auth = req.headers.authorization
        if(!auth){
            return res.status(401).json({
                message:"authurization required"
            })
        }else {
            const token = jwt.split(" ")[1]
            if(!token){
                return res.status(401).json({
                    message:"invalid token"
                })
            }
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decodedToken.userId)
        if(user){
            return res.status(401).json({
                message:"authentication failed: user not an admin"
            })
        }
        if(!user.facilitator)
      
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })}}
