const express = require("express")

const router = express.Router()

router.get("/", (req, res, next) => {
    res.json({
        message: "Welcome to Water my Plants"
    })
})

module.exports = router