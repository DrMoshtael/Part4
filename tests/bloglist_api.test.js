const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blObs = helper.initialBlogs
        .map(blog => new Blog(blog))

    const promiseArray = blObs.map(blOb => blOb.save())
    await Promise.all(promiseArray)
})

test('notes are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const blog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
      }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAfter.map(n => n.title)
    expect(titles).toContain('React patterns')
})

test('missing likes defaults to zero', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[1].likes).toBe(0)
})

afterAll(async () => {
    await mongoose.connection.close()
})