const express = require("express")
const Plants = require("./plants-model")
const restrict = require("../plants/plants-middleware")

const router = express.Router()


// get list of plants
router.get("/",restrict(), async (req, res, next) => {
    try {
        res.json(await Plants.find())
    } catch(err) {
        next(err)
    }
})

// get plants by ID
router.get("/:id", restrict(), async (req, res, next) => {
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


// get list of plants by user id
router.get("/:id/plantsList", restrict(), async (req, res, next) => {
    const { id } = req.params
    Plants.getPlantsList(id)
        .then(list => {
            res.json(list)
        })
        .catch(err => {
            next(err)
        })
})


// add plant to user - needs user_id in req to post
router.post("/", async (req, res, next) => {
    try {
        Plants.add(req.body)
            .then(newPlant => {
                res.status(200).json(newPlant)
            })
            .catch(err => {
                res.status(500).json({
                    message: "Could not add plant"
                })
            })
    } catch (err) {
        next(err)
    }
})


// edit plant (working but not returning error message)
router.put("/:id", restrict(), async (req, res, next) => {
    try {
        Plants.update(req.params.id, req.body)
            .then(updatedPlant => {
                if(updatedPlant) {
                    res.json(updatedPlant)
                } else {
                    res.status(404).json({
                        message: "Could not find plant with given ID"
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "Failed to update plant"
                })
            })
    } catch(err) {
        next(err)
    }
})


// delete plant
router.delete("/:id", restrict(), async (req, res, next) => {
    try {
        Plants.remove(req.params.id)
            .then(deleted => {
                if(deleted) {
                    res.json({ 
                        message: "Deleted!"
                    })
                } else {
                    res.status(404).json({
                        message: "Could not find plant with given ID"
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "Failed to delete plant"
                })
            })
} catch(err) {
    next(err)
}
})


module.exports = router