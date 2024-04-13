const express = require("express");
const { updateUser, findUser } = require("../controller/user");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

//auth middlewate
router.use(authMiddleware);

//user router
router.put("/update", updateUser);
router.get("/search", findUser);

module.exports = router;
