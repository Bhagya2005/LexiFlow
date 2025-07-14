const {z} = require('zod')
const userRegistration = z.object({
    name: z.string(),
    email : z.string().email("email is required"),
    password : z.string().min(6)
}) 
const userLogin = z.object({
    email:z.string().email("email is required"),
    password: z.string().min(6,"password is required")
})

module.exports ={
    userRegistration,
    userLogin
}