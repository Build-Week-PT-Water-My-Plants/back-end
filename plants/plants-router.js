const express = require("express")
const Plants = require("./plants-model")

const router = express.Router()


// get list of plants (this works)
router.get("/", async (req, res, next) => {
    try {
        res.json(await Plants.find())
    } catch(err) {
        next(err)
    }
})

// get plants by ID (this works)
router.get("/:id", async (req, res, next) => {
    try {
        const plant = await Plants.findById(req.params.id)
        if (!plant) {
            return res.status(404).json({
                message: "This plant doesn't exist"
            })
        }
        res.json(plant)
    } catch(err) {
        next(err)
    }
})


// get list of plants by user id (this should work)
router.get("/:id/plantsList", async (req, res, next) => {
    const { id } = req.params
    Plants.getPlantsList(id)
        .then(list => {
            res.json(list)
        })
        .catch(err => {
            next(err)
        })
})


// // add plant to user
// router.post("/:id/plantsList", async (req, res, next) => {

//     const { nickname, species, h2oFrequency } = req.body

//     try {
//         const newPlant = await Plants.add({
//             nickname,
//             species,
//             h2oFrequency,
//             // user id?
//         })
//     } catch(err) {
//         next(err)
//     }
// })


// edit plant



// delete plant

module.exports = router