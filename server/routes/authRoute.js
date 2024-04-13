const express = require("express");
const { registerUser, loginUser } = require("../controller/auth");
const router = express.Router();

//auth routs
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
