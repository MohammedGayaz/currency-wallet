const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")

async function authMiddleware(req, res, next){ 
    const authToken = req.header("authorization")
    if(!authToken || !authToken.startsWith("Bearer ")){
        return res.status(498).json({message : "Invalid Token"})
    }
    const jwt_token = authToken.split(" ")[1];
    try{
        const decoded = jwt.verify(jwt_token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        return res.status(403).json({})
    }
    
}

module.exports={
    authMiddleware
}