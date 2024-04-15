const { passwordHash, compareHash, genJwtToken } = require("../helper");
const User = require("../models/userDB");
const registerSchema = require("../validation/user/register");
const loginSchema = require("../validation/user/login");
const Account = require("../models/accountDB");

// user register
const registerUser = async (req, res) => {
  try {
    // Validate user input
    const { success, error } = registerSchema.safeParse(req.body);
    if (!success)
      return res.status(422).json({ error: error.errors[0].message });

    // check if user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(409).json({ error: "User already exists" });

    //hash password and create new user
    const hash = await passwordHash(req.body.password);
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: hash,
    });

    //initilizing account balance
    await Account.create({
      userId: newUser._id,
      balance: Math.round(Math.random() * 10000 + 1),
    });

    return res.status(200).json({ success: "User created successfully" });
  } catch (err) {
    console.error("Error in registerUser:", err);
    return res.status(500).json({ error: "Internal server problem" });
  }
};

// user login
// ref: https://stackoverflow.com/questions/62338013/how-to-send-jwt-token-to-cookie-and-use-in-another-routes
const loginUser = async (req, res) => {
  try {
    const { success, error } = loginSchema.safeParse(req.body);
    if (!success)
      return res.status(422).json({ error: error.errors[0].message });

    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const verified = await compareHash(req.body.password, user.password);
    if (!verified) return res.status(401).json({ error: "Incorrect password" });

    const token = await genJwtToken(user);
    res.cookie("auth-token", token);
    return res.status(200).json({
      success: "User logged in successfully",
      token: token,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server problem" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
