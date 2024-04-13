const mongoose = require("mongoose")
const {DB_URL} = require("../config");

mongoose.connect(DB_URL)

// user schema

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        require: true,
        trim: true,
        unique: true,
        minLength: 6,
        lowercase: true,
    },
    firstName : {
        type : String,
        require : true,
        trim : true,
        lowercase: true,
    },
    lastName : {
        type : String,
        require : true,
        trim : true,
        lowercase: true,
    },
    password : {
        type : String,
        require : true,
        trim : true,
        minLength : 6,
    }
});


// accoutn for user

const AccountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true,
    },
    balance : {
        type : Number,
        require : true
    }
})

const User = mongoose.model("User", UserSchema)
const Account = mongoose.model("Account", AccountSchema)


module.exports = {
    User,
    Account
}