const express = require("express");
const { checkBalance, transferAmmount } = require("../controller/account");

const router = express.Router();

router.get("/balance", checkBalance);
router.post("/transfer", transferAmmount);

module.exports = router;
