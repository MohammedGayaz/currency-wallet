const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const User = require("../models/userDB");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies["auth-token"];
    if (!token) return res.status(401).json({ error: "invalid token" });

    const decode = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ username: decode.username });
    if (!user) return res.status(401).json({ error: "unauthorized access" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: "error in middle ware" });
  }
};

module.exports = authMiddleware;
