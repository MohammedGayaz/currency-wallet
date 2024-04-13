const express = require("express")
const jwt = require("jsonwebtoken")
const {userSignUp, userSignIn, userUpdate} = require("../validations/index")
const { User, Account } = require("../db")
const { JWT_SECRET } = require("../config")
const { authMiddleware } = require("../middlewares/middleware")

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
    
    const userAccount = await Account.create({
        userId : userId,
        balance : Math.floor(Math.random() * 10000 + 1),
    })
    
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

// update user data
router.put("/", authMiddleware, async(req, res)=>{
    const {success} = userUpdate.safeParse(req.body)
    console.log(req.body)
    console.log({success})
    if(!success){
        return res.status(411).json({
            msg : "Error while updating information"
        })
    }
    await User.findOneAndUpdate({
        _id : req.userId
    }, req.body)
    res.status(200).json({message : "Updated successfully"})
})


// sending all user form back end
router.get("/bulk", async (req, res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or : [
            {
                firstName : {$regex : filter}
            },
            {
                lastName : {$regex : filter}
            }
        ]
    })
    res.status(200).json({
        users : users.map(item =>({
            username : item.username,
            firstName : item.firstName,
            lastName : item.lastName,
            _id : item._id,
        }))
    })

})

module.exports = router;
