const zod = require("zod")

const userSignUp = zod.object({
    username: zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string()
})

const userSignIn = zod.object({
    username : zod.string().email(),
    password : zod.string()
})
module.exports = {
    userSignUp,
    userSignIn
}