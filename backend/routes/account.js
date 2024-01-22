const express = require("express");
const { authMiddleware } = require("../middlewares/middleware");
const { Account} = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();


// get balance
router.get("/balance",authMiddleware, async(req, res)=>{
    const account = await Account.findOne({
        userId : req.userId,
    })
    res.json({
        balance : account.balance,
    })
})

// https://mongoosejs.com/docs/transactions.html#with-the-aggregation-framework
// https://www.mongodb.com/docs/manual/reference/operator/update/inc/

// transfer amount
router.post("/transfer",authMiddleware, async(req, res)=>{
    const session = await mongoose.startSession();

    // start trassaction
    session.startTransaction();
    const {to, amount} = req.body;

    // checking user has sufficent balance
    const userAccount = await Account.findOne({
        userId: req.userId,
    }).session(session)

    if(userAccount.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Insufficent balance"})
    }

    // checking if "to" user exist
    const toAccoutn = await Account.findOne({
        userId : to,
    }).session(session)

    if(!toAccoutn){
        await session.abortTransaction();
        return res.status(404).json({
            message : "Invalid account"
        })
    }

    // from user (debit)
    await Account.updateOne({
        userId: req.userId
    },
    {
        $inc : {
            balance: -amount
        }
    }).session(session)

    // to user (credit)
    await Account.updateOne({
        userId : to,
    },{
        $inc:{
            balance : amount,
        }
    }).session(session)

    // commit trasaction
    await session.commitTransaction();

    res.status(200).json({
        message : "Transfer Successfully",
    });
});


module.exports = router;
