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

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("User authentication testing", () => {
    it("POST /users/register", async() => {
        const res = await supertest(server)
        .post("/users/register")
        .send({username: "plantuser1", phoneNumber: 1234567890, password: "123456"})
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
    })
    it("POST /users/register-Gives error if registering with already made user", async() => {
        const res = await supertest(server)
        .post("/users/register")
        .send({username: "plantuser123", phoneNumber: 1234567890, password:"123456"})
        expect(res.statusCode).toBe(409)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Username is already in use")
    })
    it("POST /users/login", async() => {
        const res = await supertest(server)
        .post("/users/login")
        .send({username: "plantuser123", password: "123456"})
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Welcome to your plant page plantuser123!")
    })
    it("POST /users/login- error message for wrong user", async() => {
        const res = await supertest(server)
        .post("/users/login")
        .send({username:"notauser", password:"123456"})
        expect(res.statusCode).toBe(401)
        expect(res.body.message).toBe("Invalid Username or Password")
    })
    it("PUT /users/:id", async() => {
        const res = await supertest(server)
        .post("/users/login")
        .send({username:"plantuser123", password:"123456"})
        expect(res.body.message).toBe("Welcome to your plant page plantuser123!")
        const res2 = await supertest(server)
        .put("/users/1")
        .send({phoneNumber: 1234567891, password:"123456"})
        expect(res2.statusCode).toBe(200)
    })
})