const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { saltRound, JWT_SECRET } = require("../config");

const passwordHash = async (password) => {
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const compareHash = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

const genJwtToken = async (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    JWT_SECRET
  );
  return token;
};

module.exports = {
  //   hashPassword,
  passwordHash,
  compareHash,
  genJwtToken,
};
