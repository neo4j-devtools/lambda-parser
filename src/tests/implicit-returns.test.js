import parseLambda from '../parse-lambda';

describe('implicit returns', () => {
    test('support strings', () => {
        expect(parseLambda('x => "foo"')).toEqual([
            {
                type: 'lambda',
                variant: 'implicit',
                parameters: {
                    type: 'token',
                    value: 'x'
                },
                body: {
                    returnValues: [{
                        value: '"foo"',
                        type: 'string',
                        from: [{
                            type: 'string',
                            value: 'foo'
                        }]
                    }]
                }
            }
        ])
    });

    test('support tokens with numbers in their names', () => {
        expect(parseLambda('x1 => "foo"')).toEqual([
            {
                type: 'lambda',
                variant: 'implicit',
                parameters: {
                    type: 'token',
                    value: 'x1'
                },
                body: {
                    returnValues: [{
                        value: '"foo"',
                        type: 'string',
                        from: [{
                            type: 'string',
                            value: 'foo'
                        }]
                    }]
                }
            }
        ])
    });

    test('does not support tokens with numbers first in their names', () => {
        expect(() => parseLambda('1x => "foo"')).toThrow('Syntax error at line 1 col 1:');
    });

    test('supports integers', () => {
        expect(parseLambda('x => 1')).toEqual([
            {
                type: 'lambda',
                variant: 'implicit',
                parameters: {
                    type: 'token',
                    value: 'x'
                },
                body: {
                    returnValues: [{
                        value: '1',
                        type: 'number',
                        from: [{
                            type: 'number',
                            value: 1
                        }]
                    }]
                }
            }
        ])
    });

    test('supports floats', () => {
        expect(parseLambda('x => 1.1')).toEqual([
            {
                type: 'lambda',
                variant: 'implicit',
                parameters: {
                    type: 'token',
                    value: 'x'
                },
                body: {
                    returnValues: [{
                        value: '1.1',
                        type: 'number',
                        from: [{
                            type: 'number',
                            value: 1.1
                        }]
                    }]
                }
            }
        ])
    });

    test('supports function calls', () => {
        expect(parseLambda('x => rand()')).toEqual([
            {
                type: 'lambda',
                variant: 'implicit',
                parameters: {
                    type: 'token',
                    value: 'x'
                },
                body: {
                    returnValues: [{
                        value: 'rand()',
                        type: 'functionCall',
                        from: [{
                            name: 'rand',
                            value: 'rand()',
                            type: 'functionCall',
                            args: []
                        }]
                    }]
                }
            }
        ])
    });

    test('supports function calls with parameters', () => {
        expect(parseLambda('x => foo(a,b,c)')).toEqual([
            {
                type: 'lambda',
                variant: 'implicit',
                parameters: {
                    type: 'token',
                    value: 'x'
                },
                body: {
                    returnValues: [{
                        value: 'foo(a,b,c)',
                        type: 'functionCall',
                        from: [{
                            name: 'foo',
                            value: 'foo(a,b,c)',
                            type: 'functionCall',
                            args: [
                                { type: 'token', value: 'a', from: [{ type: 'token', value: 'a' }] },
                                { type: 'token', value: 'b', from: [{ type: 'token', value: 'b' }] },
                                { type: 'token', value: 'c', from: [{ type: 'token', value: 'c' }] }
                            ]
                        }]
                    }]
                }
            }
        ])
    });

    test('ignores whitespace in function calls with parameters', () => {
        expect(parseLambda('x => foo ( a , b,   c  )')).toEqual([
            {
                type: 'lambda',
                variant: 'implicit',
                parameters: {
                    type: 'token',
                    value: 'x'
                },
                body: {
                    returnValues: [{
                        value: 'foo(a,b,c)',
                        type: 'functionCall',
                        from: [{
                            name: 'foo',
                            value: 'foo(a,b,c)',
                            type: 'functionCall',
                            args: [
                                { type: 'token', value: 'a', from: [{ type: 'token', value: 'a' }] },
                                { type: 'token', value: 'b', from: [{ type: 'token', value: 'b' }] },
                                { type: 'token', value: 'c', from: [{ type: 'token', value: 'c' }] }
                            ]
                        }]
                    }]
                }
            }
        ])
    });

    test('supports AS keyword for simple values', () => {
        expect(parseLambda('x => "foo" AS bar')).toEqual([
            {
                type: 'lambda',
                variant: 'implicit',
                parameters: {
                    type: 'token',
                    value: 'x'
                },
                body: {
                    returnValues: [{
                        value: '"foo"',
                        alias: 'bar',
                        type: 'string',
                        from: [{
                            type: 'string',
                            value: 'foo'
                        }]
                    }]
                }
            }
        ])
    });

    test('supports AS keyword for function calls', () => {
        expect(parseLambda('x => rand() AS bar')).toEqual([
            {
                type: 'lambda',
                variant: 'implicit',
                parameters: {
                    type: 'token',
                    value: 'x'
                },
                body: {
                    returnValues: [{
                        value: 'rand()',
                        alias: 'bar',
                        type: 'functionCall',
                        from: [{
                            name: 'rand',
                            value: 'rand()',
                            type: 'functionCall',
                            args: []
                        }]
                    }]
                }
            }
        ])
    });

    test('supports AS keyword regardless of casing', () => {
        expect(parseLambda('x => rand() aS bar')).toEqual([
            {
                type: 'lambda',
                variant: 'implicit',
                parameters: {
                    type: 'token',
                    value: 'x'
                },
                body: {
                    returnValues: [{
                        value: 'rand()',
                        alias: 'bar',
                        type: 'functionCall',
                        from: [{
                            name: 'rand',
                            value: 'rand()',
                            type: 'functionCall',
                            args: []
                        }]
                    }]
                }
            }
        ])
    });

    test('does not support destructuring', () => {
        expect(() => parseLambda('[x] => rand() AS bar')).toThrow('Syntax error at line 1 col 8:')
    });


    test('Supports returning function calls with object path (number)', () => {
        const query = `x => COLLECT(label)[0]`;

        expect(parseLambda(query)).toEqual([
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
                            value: 'COLLECT(label)[0]',
                            type: 'path',
                            from: [
                                {
                                    type: 'functionCall',
                                    value: 'COLLECT(label)',
                                    from: [
                                        {
                                            type: 'functionCall',
                                            name: 'COLLECT',
                                            value: 'COLLECT(label)',
                                            args: [
                                                {type: 'token', value: 'label', from: [{type: 'token', value: 'label'}]}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: 'path',
                                    value: '[0]',
                                    from: [
                                        {
                                            type: 'path',
                                            variant: 'number',
                                            value: '[0]'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ])
    });

    test('Supports returning function calls with object path (string)', () => {
        const query = `x => COLLECT(label)["123 hurr durr"]`;

        expect(parseLambda(query)).toEqual([
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
                            value: 'COLLECT(label)["123 hurr durr"]',
                            type: 'path',
                            from: [
                                {
                                    type: 'functionCall',
                                    value: 'COLLECT(label)',
                                    from: [
                                        {
                                            type: 'functionCall',
                                            name: 'COLLECT',
                                            value: 'COLLECT(label)',
                                            args: [
                                                {type: 'token', value: 'label', from: [{type: 'token', value: 'label'}]}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: 'path',
                                    value: '["123 hurr durr"]',
                                    from: [
                                        {
                                            type: 'path',
                                            variant: 'string',
                                            value: '["123 hurr durr"]'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ])
    });

    test('Supports returning function calls with object path (token)', () => {
        const query = `x => COLLECT(label).foo`;

        expect(parseLambda(query)).toEqual([
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
                            value: 'COLLECT(label).foo',
                            type: 'path',
                            from: [
                                {
                                    type: 'functionCall',
                                    value: 'COLLECT(label)',
                                    from: [
                                        {
                                            type: 'functionCall',
                                            name: 'COLLECT',
                                            value: 'COLLECT(label)',
                                            args: [
                                                {type: 'token', value: 'label', from: [{type: 'token', value: 'label'}]}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: 'path',
                                    value: '.foo',
                                    from: [
                                        {
                                            type: 'path',
                                            variant: 'token',
                                            value: '.foo'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ])
    });

    test('Supports returning function calls with deep object path', () => {
        const query = `x => COLLECT(label)[0].foo["yolo"]`;

        expect(parseLambda(query)).toEqual([
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
                            value: 'COLLECT(label)[0].foo["yolo"]',
                            type: 'path',
                            from: [
                                {
                                    type: 'functionCall',
                                    value: 'COLLECT(label)',
                                    from: [
                                        {
                                            type: 'functionCall',
                                            name: 'COLLECT',
                                            value: 'COLLECT(label)',
                                            args: [
                                                {type: 'token', value: 'label', from: [{type: 'token', value: 'label'}]}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: 'path',
                                    value: '[0]',
                                    from: [
                                        {
                                            type: 'path',
                                            variant: 'number',
                                            value: '[0]'
                                        }
                                    ]
                                },
                                {
                                    type: 'path',
                                    value: '.foo',
                                    from: [
                                        {
                                            type: 'path',
                                            variant: 'token',
                                            value: '.foo'
                                        }
                                    ]
                                },
                                {
                                    type: 'path',
                                    value: '["yolo"]',
                                    from: [
                                        {
                                            type: 'path',
                                            variant: 'string',
                                            value: '["yolo"]'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ])
    });

    test('Supports returning function calls with object path using AS', () => {
        const query = `x => COLLECT(label)[0] AS foo`;

        expect(parseLambda(query)).toEqual([
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
                            value: 'COLLECT(label)[0]',
                            alias: 'foo',
                            type: 'path',
                            from: [
                                {
                                    type: 'functionCall',
                                    value: 'COLLECT(label)',
                                    from: [
                                        {
                                            type: 'functionCall',
                                            name: 'COLLECT',
                                            value: 'COLLECT(label)',
                                            args: [
                                                {type: 'token', value: 'label', from: [{type: 'token', value: 'label'}]}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: 'path',
                                    value: '[0]',
                                    from: [
                                        {
                                            type: 'path',
                                            variant: 'number',
                                            value: '[0]'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ])
    });
});
