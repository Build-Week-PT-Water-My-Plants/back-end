require("dotenv").config();

const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const session = require("express-session")

const usersRouter = require("./users/users-router")
const plantsRouter = require("./plants/plants-router")
const authenticate = require("./plants/plants-middleware")


const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "process.env.JWT_SECRET",
}))


// server.use("/api/users", usersRouter)
// server.use("/api/plants", authenticate, plantsRouter)

module.exports = server