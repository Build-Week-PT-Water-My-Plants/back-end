const db = require("../database/config")

async function add(plant) {
	const [id] = await db("plants").insert(plant)
	return findById(id)
}

function find() {
	return db("plants").select("id", "nickname", "species", "h2oFrequency")
}

function findBy(filter) {
	return db("plants")
		.select("id", "nickname")
		.where(filter)
}

function findById(id) {
	return db("plants")
		.select("id", "nickname")
		.where("id", id)
		.first()
}

// get plants by user ID
function getPlantsList(userID) {
    return db('plants')
        .join('users', 'users.id', '=', 'user_id')
        .select('plants.id as plantID', 'plants.nickname as Nickname', 'plants.species as Species', 'plants.h2oFrequency as h2oFrequency')
        .orderBy('plants.id')
}

module.exports = {
	add,
	find,
	findBy,
    findById,
    getPlantsList
}