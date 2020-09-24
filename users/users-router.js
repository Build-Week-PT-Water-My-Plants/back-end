const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")
const restrict = require("../plants/plants-middleware")

const router = express.Router()

router.get("/", restrict(), async (req,res,next) => {
    try {
        res.json(await Users.find())
    } catch(err) {
        next(err)
    }
})

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
        
        res.json({
            message: `Welcome to your plant page ${user.username}!`, token, user
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

router.put("/:id", restrict(), async(req, res, next) => {
    try {
        const {phoneNumber, password} = req.body
        const userUpdate = await Users.updateUser({phoneNumber, password: await bcrypt.hash(password, 14)}, req.params.id)

        res.status(200).json({userUpdate:userUpdate, message: "You have successfully updated your information"})
    } catch(err) {
        next(err)
    }
}) 
module.exports = router;