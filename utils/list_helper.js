const logger = require('../utils/logger')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((accumulator, currentItem) => accumulator + currentItem.likes, 0)


module.exports = {
    dummy,
    totalLikes
}