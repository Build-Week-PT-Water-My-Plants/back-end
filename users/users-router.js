const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")
const restrict = require("../plants/plants-middleware")

const router = express.Router()

router.post("/register", async (req, res, next) => {
    try {
        const {username, password, phoneNumber} = req.body
        const user = await Users.findBy({username}).first()

        if(user) {
            return res.status(409).json({
                message: "Username is already in use",
            })
        }
        const newUser = await Users.create({
            username,
            password: await bcrypt.hash(password, 14),
            phoneNumber,
        })

        res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
})

router.post("/login", async(req, res, next) => {
    try {
        const {username, password} = req.body
        const user = await Users.findBy({username}).first()
        
        if(!user) {
            return res.status(401).json({message: "Invalid Username or Password",})
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if(!passwordValid) {
            return res.status(401).json({message: "Invalid Username or Password",})
        }
        
        const token = jwt.sign({
            userId: user.id,
        }, process.env.JWT_SECRET)
        

        res.cookie("token", token)

        res.json({
            message: `Welcome to your plant page ${user.username}!`
        })
    } catch (err) {
        next(err)
    }
});

router.get("/logout", restrict(), (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                next(err)
            } else {
                res.status(204).end()
            }
        })
    } catch (err) {
        next(err)
    }
})

router.put("/updateuser/:id", restrict(), async(req, res, next) => {
    try {
        const {id} = req.params;
        const {phoneNumber, password} = req.body
        const user = await Users.findBy({id}).first()

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const userUpdate = await Users.updateUser({
            phoneNumber,
            password,
        })

        res.status(204).json(userUpdate)
    } catch(err) {
        next(err)
    }
}) 
module.exports = router;