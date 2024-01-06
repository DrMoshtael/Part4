const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog
        .findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            }
            else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter