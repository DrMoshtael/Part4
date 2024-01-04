const logger = require('../utils/logger')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, currentItem) => accumulator + currentItem.likes, 0)
}

const favouriteBlog = (blogs) => {
    const fav = blogs.reduce((favouriteBlog,currentBlog) => 
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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}