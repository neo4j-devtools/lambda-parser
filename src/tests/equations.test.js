import parseLambda from '../parse-lambda'

describe('equations', () => {
    test('is unary', () => {
        expect(parseLambda.length).toBe(1)
    })
})