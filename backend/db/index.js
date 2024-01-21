const mongoose = require("mongoose")
const {DB_URL} = require("../config")

mongoose.connect(DB_URL)

// user schema

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        require: true,
        trim: true,
        unique: true,
        minLength: 6,
        maxLength: 12,
        lowercase: true,
    },
    firstName : {
        type : String,
        require : true,
        trim : true,
    },
    lastName : {
        type : String,
        require : true,
        trim : true,
    },
    password : {
        type : String,
        require : true,
        trim : true,
        minLength : 6,
    }
});


const User = mongoose.model("User", UserSchema, "users")


module.exports = {
    User
}