const zod = require("zod")

// user input valadation
const userSignUp = zod.object({
    username: zod.string().email().min(6),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string().min(6)
})

const userSignIn = zod.object({
    username : zod.string().email().min(6),
    password : zod.string().min(6)
})

const userUpdate = zod.object({
    password : zod.string().min(6).optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional(),
})


module.exports = {
    userSignUp,
    userSignIn,
    userUpdate,
}