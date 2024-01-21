const express = require("express")
const jwt = require("jsonwebtoken")
const {userSignUp, userSignIn} = require("../validations/index")
const { User } = require("../db")
const { JWT_SECRET } = require("../config")

const router = express.Router()

// SIGN UP 
router.post("/signup", async (req, res)=>{
    const {success} = userSignUp.safeParse(req.body);
    if(!success){
        return res.status(403).json({msg : "Invalid Inputs"})
    }

    const existingUser = await User.findOne({username : req.body.username})
    if(existingUser){
        return res.status(411).json({msg : "User Alredy Exist"})
    }

    const user = await User.create({
        username : req.body.username,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password,
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    res.status(200).json({
        message : "User created Successfully",
        token : token,
    })
})


// SIGN IN
router.post("/signin", async (req, res) =>{
    const {success} = userSignIn.safeParse(req.body)
    if(!success){
        return res.status(403).json({msg : "Invalid Inputs"})
    }
    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password,
    })
    if(!user){
        return res.status(404).json({message : "User not found"})
    }
    const token = jwt.sign({
        userId : user._id
    }, JWT_SECRET);
    res.status(200).json({
        token: token,
    })
})

module.exports = router;