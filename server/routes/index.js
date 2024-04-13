const express = require("express");

const userRouter = require("./userRoute");
const authRouter = require("./authRoute");
const accoutRouter = require("./accountRoute");

const router = express.Router();

//main routes
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/user/account", accoutRouter);

module.exports = router;
