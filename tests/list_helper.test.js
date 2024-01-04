const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only 1 blog equals the like of that', () => {
        const blog = {
            "title":"Technology, Values, and the Shaping of Social Reality",
            "author":"Matt Weinberg",
            "url":"https://bahaiworld.bahai.org/library/technology-values-and-the-shaping-of-social-reality-2/",
            "likes":1000,
            "__v": 0
        }
        expect(listHelper.totalLikes([blog])).toBe(1000)
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                "title":"Technology, Values, and the Shaping of Social Reality",
                "author":"Matt Weinberg",
                "url":"https://bahaiworld.bahai.org/library/technology-values-and-the-shaping-of-social-reality-2/",
                "likes":1000,
                "__v": 0
            },
            {
                "title": "The Crisis of Identity",
                "author": "Shahrzad Sabet",
                "url":"https://bahaiworld.bahai.org/library/the-crisis-of-identity/",
                "likes":950,
                "__v": 1
            }
        ]
        expect(listHelper.totalLikes(blogs)).toBe(1950)
    })
})