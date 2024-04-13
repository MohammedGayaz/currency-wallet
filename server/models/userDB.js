const mongoose = require("mongoose");

// user schema
const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true, minLength: 3, trim: true },
  lastname: { type: String, minLength: 3, trim: true },
  username: { type: String, required: true, lowercase:true, trim: true, minLength: 6, unique: true },
  password: { type: String, required: true, minLength: 6, trim: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User