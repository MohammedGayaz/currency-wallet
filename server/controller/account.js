const mongoose = require("mongoose");
const Account = require("../models/accountDB");

const checkBalance = async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.user._id });
    if (!account) return res.status(404).json({ error: "No Account found" });
    return res.status(200).json({ balance: account.balance });
  } catch (err) {
    console.error("Error in checkBalance:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const transferAmmount = async (req, res) => {
  try {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.user._id }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: req.user._id },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.json({
      success: "Transfer successful",
    });
  } catch (err) {
    console.error("Error in transferAmount:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  checkBalance,
  transferAmmount,
};
