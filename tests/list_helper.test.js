const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

const blog1 = {
    "title":"Technology, Values, and the Shaping of Social Reality",
    "author":"Matt Weinberg",
    "url":"https://bahaiworld.bahai.org/library/technology-values-and-the-shaping-of-social-reality-2/",
    "likes":1000,
    "__v": 0
}
const blog2 = {
    "title": "The Crisis of Identity",
    "author": "Shahrzad Sabet",
    "url":"https://bahaiworld.bahai.org/library/the-crisis-of-identity/",
    "likes":950,
    "__v": 1
}

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only 1 blog equals the like of that', () => {
        expect(listHelper.totalLikes([blog1])).toBe(1000)
    })

    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes([blog1,blog2])).toBe(1950)
    })
})

describe('favourite blog', () => {
    test('of an empty array is 0', () => {
        expect(listHelper.favouriteBlog([])).toBe(0)
    })

    test('when a list has only 1 blog equals that blog', () => {
        expect(listHelper.favouriteBlog([blog2])).toEqual({
            "title": blog2.title,
            "author": blog2.author,
            "likes": blog2.likes
        })
    })

    test('when a list has multiple blogs equals the blog with most likes', () => {
        expect(listHelper.favouriteBlog([blog1, blog2])).toEqual({
            "title": blog1.title,
            "author": blog1.author,
            "likes": blog1.likes
        })
    })
})