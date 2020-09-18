const db = require("../database/config")

async function create(user) {
    const [id] = await db ("users")
    .insert(user)
    return findUserById(id)
}

function find() {
    return db("users")
    .select("id", "username")
}

function findBy(filter) {
    return db("users")
    .select("id", "username", "password", "phoneNumber")
    .where(filter)
}

function findUserById(id) {
    return db("users")
    .select("id", "username")
    .where({id})
    .first()
}

function updateUser(changes, id) {
    return db("users")
    .update(changes)
    .where({id})
}

module.exports = {
    create,
    find,
    findBy,
    findUserById,
    updateUser
}