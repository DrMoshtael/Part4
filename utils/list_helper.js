const logger = require('../utils/logger')
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, currentItem) => accumulator + currentItem.likes, 0)
}

const favouriteBlog = (blogs) => {
    const fav = blogs.reduce((favouriteBlog, currentBlog) =>
        favouriteBlog = favouriteBlog.likes > currentBlog.likes
            ? favouriteBlog
            : currentBlog,
        0
    )

    return fav === 0
        ? 0
        : {
            "title": fav.title,
            "author": fav.author,
            "likes": fav.likes
        }
}

const mostBlogs = (blogs) => {
    if (_.isEmpty(blogs)) return 0

    const frequencies = _.chain(blogs)
        .map(n => n.author) //array of authors
        .reduce((obj, ele) => {
            obj[ele] = (obj[ele] || 0) + 1 //Create or reference property, incrementing using short-circuit evaluation
            return obj //return authors with their frequencies
        },
            {}
        )
        .value()

    logger.info('freq', frequencies)
    pop_author = _.maxBy(Object.keys(frequencies), author => frequencies[author]) 
    logger.info('auth', pop_author)

    return { "author": pop_author, "blogs": frequencies[pop_author] }

}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}