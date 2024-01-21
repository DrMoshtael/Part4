const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./users_helper')
const mongoose = require('mongoose')

beforeEach(async () => {
    await User.deleteMany({})
})

describe('Creating a new user', () => {
    test('succeeds if conditions are met', async () => {
        const user = {
            "username": "test1",
            "password": "pass1",
            "name": "tester1"
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAfter = await helper.usersInDb()

        expect(usersAfter).toHaveLength(1)
        const usernames = usersAfter.map(n => n.username)
        expect(usernames).toContain('test1')
    })

    test('fails if the username is too short', async () => {
        const user = {
            "username": "te",
            "password": "pass2",
            "name": "tester2"
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect(res => expect(res.body.error).toContain('is shorter than the minimum allowed length'))

        const usersAfter = await helper.usersInDb()
        expect(usersAfter).toHaveLength(0)
    })

    test('fails if the password is too short', async () => {
        const user = {
            "username": "test3",
            "password": "pa",
            "name": "tester3"
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect(res => expect(res.body.error).toContain('Password too short'))

        const usersAfter = await helper.usersInDb()
        expect(usersAfter).toHaveLength(0)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})