const supertest = require("supertest")
const server = require("../server")
const db = require("../database/config")



jest.mock("../plants/plants-middleware", () => {
    return jest.fn(() => {
        return (req, res, next) => {
            next()
        }
    })
})

// beforeAll(async () => {
//     await db.migrate.rollback()
//     await db.migrate.latest()
//     await db.seed.run()
// })

// afterAll(async () => {
//     await db.destroy()
// })



// plants endpoint testing
describe("plant routers tests", () => {

    // logs user in as all plants routers need auth user
    beforeEach(async () => {
        token = await supertest(server)
            .post("/users/login")
            .send({username: "plantuser123", password: "123456"})
            .then(res => {
                return res.body.token;
            });
    });

// get list of plants (just for us)
it("GET /plants/", async () => {
    const res = await supertest(server)
    .get("/plants/")
    expect(res.type).toBe("application/json")
})

// get list of plants by user
it("GET /plants/:id/plantsList", async () => {
    const res = await supertest(server)
    .get("/plants/1/plantsList")
    expect(res.type).toBe("application/json")
})

// add plant to user
it("POST /plants/addPlant/:id", async () => {
    const res = await supertest(server)
    .post("/plants/addPlant/1")
    .send({nickname: "Plant Add Test", species: "test", h2oFrequency: "test"})
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json")
})

// edit plant
it("PUT /plants/:id", async () => {
    const res = await supertest(server)
    .put("/plants/1")
    .send({nickname: "Edited Plant", species: "test", h2oFrequency: "test"})
    expect(res.status).toBe(200)
    expect(res.body.message).toBe("You have successfully updated your plant information")
})

// delete plant
it("DELETE /plants/:id", async () => {
    const res = await supertest(server)
    .delete("/plants/1")
    expect(res.body.message).toBe("Deleted!")
})

})