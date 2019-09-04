import parseLambda from '../parse-lambda'

describe('complex cypher parameters', () => {
    describe('implicit returns', () => {
        test('support cypher functions with token parameters', () => {
            expect(parseLambda('x => abs(g)')).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        returnValues: [
                            {
                                value: 'abs(g)',
                                type: 'functionCall',
                                from: [
                                    {
                                        type: 'functionCall',
                                        name: 'abs',
                                        value: 'abs(g)',
                                        args: [
                                            {
                                                value: 'g',
                                                type: 'token',
                                                from: [
                                                    {
                                                        type: 'token',
                                                        value: 'g'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ])
        })

        test('support cypher functions with number (int) parameters', () => {
            expect(parseLambda('x => abs(5)')).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        returnValues: [
                            {
                                value: 'abs(5)',
                                type: 'functionCall',
                                from: [
                                    {
                                        type: 'functionCall',
                                        name: 'abs',
                                        value: 'abs(5)',
                                        args: [
                                            {
                                                value: '5',
                                                type: 'number',
                                                from: [
                                                    {
                                                        type: 'number',
                                                        value: 5
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ])
        })

        test('support cypher functions with number (float) parameters', () => {
            expect(parseLambda('x => abs(5.2)')).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        returnValues: [
                            {
                                value: 'abs(5.2)',
                                type: 'functionCall',
                                from: [
                                    {
                                        type: 'functionCall',
                                        name: 'abs',
                                        value: 'abs(5.2)',
                                        args: [
                                            {
                                                value: '5.2',
                                                type: 'number',
                                                from: [
                                                    {
                                                        type: 'number',
                                                        value: 5.2
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ])
        })

        test('support cypher functions with number (negative) parameters', () => {
            expect(parseLambda('x => abs(-5.2)')).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        returnValues: [
                            {
                                value: 'abs(-5.2)',
                                type: 'functionCall',
                                from: [
                                    {
                                        type: 'functionCall',
                                        name: 'abs',
                                        value: 'abs(-5.2)',
                                        args: [
                                            {
                                                value: '-5.2',
                                                type: 'number',
                                                from: [
                                                    {
                                                        type: 'number',
                                                        value: -5.2
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ])
        })

        test('support cypher functions with string parameters', () => {
            expect(parseLambda('x => abs("foo")')).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        returnValues: [
                            {
                                value: 'abs("foo")',
                                type: 'functionCall',
                                from: [
                                    {
                                        type: 'functionCall',
                                        name: 'abs',
                                        value: 'abs("foo")',
                                        args: [
                                            {
                                                value: '"foo"',
                                                type: 'string',
                                                from: [
                                                    {
                                                        type: 'string',
                                                        value: 'foo'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ])
        })

        test('support cypher functions with string parameters', () => {
            expect(parseLambda('x => abs("foo")')).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        returnValues: [
                            {
                                value: 'abs("foo")',
                                type: 'functionCall',
                                from: [
                                    {
                                        type: 'functionCall',
                                        name: 'abs',
                                        value: 'abs("foo")',
                                        args: [
                                            {
                                                value: '"foo"',
                                                type: 'string',
                                                from: [
                                                    {
                                                        type: 'string',
                                                        value: 'foo'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ])
        })

        test('support cypher functions with operator parameters', () => {
            expect(parseLambda('x => abs("foo" <> "bar")')).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        returnValues: [
                            {
                                value: 'abs("foo" <> "bar")',
                                type: 'functionCall',
                                from: [
                                    {
                                        type: 'functionCall',
                                        name: 'abs',
                                        value: 'abs("foo" <> "bar")',
                                        args: [
                                            {
                                                value: '"foo" <> "bar"',
                                                type: 'complex',
                                                from: [
                                                    {
                                                        type: 'string',
                                                        value: '"foo"',
                                                        from: [
                                                            {
                                                                type: 'string',
                                                                value: 'foo'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        type: 'operator',
                                                        value: '<>',
                                                        from: [
                                                            [
                                                                'INEQUALITY'
                                                            ]
                                                        ]
                                                    },
                                                    {
                                                        value: '"bar"',
                                                        type: 'string',
                                                        from: [
                                                            {
                                                                type: 'string',
                                                                value: 'bar'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ])
        })

        test('support cypher functions with operator parameters comparing different types', () => {
            expect(parseLambda('x => abs("foo" <> 500)')).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        returnValues: [
                            {
                                value: 'abs("foo" <> 500)',
                                type: 'functionCall',
                                from: [
                                    {
                                        type: 'functionCall',
                                        name: 'abs',
                                        value: 'abs("foo" <> 500)',
                                        args: [
                                            {
                                                value: '"foo" <> 500',
                                                type: 'complex',
                                                from: [
                                                    {
                                                        type: 'string',
                                                        value: '"foo"',
                                                        from: [
                                                            {
                                                                type: 'string',
                                                                value: 'foo'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        type: 'operator',
                                                        value: '<>',
                                                        from: [
                                                            [
                                                                'INEQUALITY'
                                                            ]
                                                        ]
                                                    },
                                                    {
                                                        value: '500',
                                                        type: 'number',
                                                        from: [
                                                            {
                                                                value: 500,
                                                                type: 'number',
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ])
        })

        test('support cypher functions with operator parameters comparing different types regardless of order (left|right)', () => {
            expect(parseLambda('x => abs(500 <> "foo")')).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        returnValues: [
                            {
                                value: 'abs(500 <> "foo")',
                                type: 'functionCall',
                                from: [
                                    {
                                        type: 'functionCall',
                                        name: 'abs',
                                        value: 'abs(500 <> "foo")',
                                        args: [
                                            {
                                                value: '500 <> "foo"',
                                                type: 'complex',
                                                from: [
                                                    {
                                                        value: '500',
                                                        type: 'number',
                                                        from: [
                                                            {
                                                                value: 500,
                                                                type: 'number',
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        type: 'operator',
                                                        value: '<>',
                                                        from: [
                                                            [
                                                                'INEQUALITY'
                                                            ]
                                                        ]
                                                    },
                                                    {
                                                        type: 'string',
                                                        value: '"foo"',
                                                        from: [
                                                            {
                                                                type: 'string',
                                                                value: 'foo'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ])
        })

        test('support cypher functions with operator parameters comparing different types regardless of order (left|right)', () => {
            expect(parseLambda('x => abs(500 <> "foo")')).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        returnValues: [
                            {
                                value: 'abs(500 <> "foo")',
                                type: 'functionCall',
                                from: [
                                    {
                                        type: 'functionCall',
                                        name: 'abs',
                                        value: 'abs(500 <> "foo")',
                                        args: [
                                            {
                                                value: '500 <> "foo"',
                                                type: 'complex',
                                                from: [
                                                    {
                                                        value: '500',
                                                        type: 'number',
                                                        from: [
                                                            {
                                                                value: 500,
                                                                type: 'number',
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        type: 'operator',
                                                        value: '<>',
                                                        from: [
                                                            [
                                                                'INEQUALITY'
                                                            ]
                                                        ]
                                                    },
                                                    {
                                                        type: 'string',
                                                        value: '"foo"',
                                                        from: [
                                                            {
                                                                type: 'string',
                                                                value: 'foo'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ])
        })

        test('support cypher functions with operator parameters using any number of operators', () => {
            expect(parseLambda('x => abs(500 <> "foo" =~ "o" NOT IN [a,b,c])')).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        returnValues: [
                            {
                                value: 'abs(500 <> "foo")',
                                type: 'functionCall',
                                from: [
                                    {
                                        type: 'functionCall',
                                        name: 'abs',
                                        value: 'abs(500 <> "foo")',
                                        args: [
                                            {
                                                value: '500 <> "foo"',
                                                type: 'complex',
                                                from: [
                                                    {
                                                        value: '500',
                                                        type: 'number',
                                                        from: [
                                                            {
                                                                value: 500,
                                                                type: 'number',
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        type: 'operator',
                                                        value: '<>',
                                                        from: [
                                                            [
                                                                'INEQUALITY'
                                                            ]
                                                        ]
                                                    },
                                                    {
                                                        type: 'string',
                                                        value: '"foo"',
                                                        from: [
                                                            {
                                                                type: 'string',
                                                                value: 'foo'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ])
        })
    })
})