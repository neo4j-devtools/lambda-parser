import parseLambda from '../parse-lambda'

describe('operators', () => {
    test('is unary', () => {
        expect(parseLambda.length).toBe(1)
    })
})