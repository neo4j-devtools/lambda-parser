import parseLambda from './parse-lambda';

describe('lambda-parser', () => {
    describe('implicit returns', () => {
        test('support strings', () => {
            expect(parseLambda('x => "foo"')).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        return: {
                            name: '"foo"',
                            original: {
                                type: 'string',
                                tokens: ['foo']
                            }
                        }
                    }
                }
            ])
        });

        test('supports integers', () => {
            expect(parseLambda('x => 1')).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        return: {
                            name: '1',
                            original: {
                                type: 'number',
                                tokens: [1]
                            }
                        }
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
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        return: {
                            name: 'rand()',
                            original: {
                                name: 'rand',
                                type: 'functionCall',
                                args: []
                            }
                        }
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
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        return: {
                            name: 'foo(a,b,c)',
                            original: {
                                name: 'foo',
                                type: 'functionCall',
                                args: ['a', 'b', 'c']
                            }
                        }
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
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        return: {
                            name: 'foo(a,b,c)',
                            original: {
                                name: 'foo',
                                type: 'functionCall',
                                args: ['a', 'b', 'c']
                            }
                        }
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
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        return: {
                            name: 'bar',
                            original: {
                                type: 'string',
                                tokens: ['foo']
                            }
                        }
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
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        return: {
                            name: 'bar',
                            original: {
                                name: 'rand',
                                type: 'functionCall',
                                args: []
                            }
                        }
                    }
                }
            ])
        });

        test('does not support destructuring', () => {
            expect(() => parseLambda('[x] => rand() AS bar')).toThrow('Syntax error at line 1 col 8:')
        });
    });

    describe('explicit returns', () => {
        test('support strings', () => {
            expect(parseLambda('x => { RETURN "foo" }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        statement: '',
                        return: [
                            {
                                name: '"foo"',
                                original: {
                                    type: 'string',
                                    tokens: ['foo']
                                }
                            }
                        ]
                    }
                }
            ])
        });

        test('supports integers', () => {
            expect(parseLambda('x => { RETURN 1 }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        statement: '',
                        return: [
                            {
                                name: '1',
                                original: {
                                    type: 'number',
                                    tokens: [1]
                                }
                            }
                        ]
                    }
                }
            ])
        });

        test('supports function calls', () => {
            expect(parseLambda('x => { RETURN rand() }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        statement: '',
                        return: [
                            {
                                name: 'rand()',
                                original: {
                                    name: 'rand',
                                    type: 'functionCall',
                                    args: []
                                }
                            }
                        ]
                    }
                }
            ])
        });

        test('supports function calls with parameters', () => {
            expect(parseLambda('x => { RETURN foo(a,b,c) }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        statement: '',
                        return: [
                            {
                                name: 'foo(a,b,c)',
                                original: {
                                    name: 'foo',
                                    type: 'functionCall',
                                    args: ['a', 'b', 'c']
                                }
                            }
                        ]
                    }
                }
            ])
        });

        test('ignores whitespace in function calls with parameters', () => {
            expect(parseLambda('x => { RETURN foo ( a , b,   c  ) }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        statement: '',
                        return: [
                            {
                                name: 'foo(a,b,c)',
                                original: {
                                    name: 'foo',
                                    type: 'functionCall',
                                    args: ['a', 'b', 'c']
                                }
                            }
                        ]
                    }
                }
            ])
        });

        test('supports AS keyword for simple values', () => {
            expect(parseLambda('x => { RETURN "foo" AS bar }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        statement: '',
                        return: [
                            {
                                name: 'bar',
                                original: {
                                    type: 'string',
                                    tokens: ['foo']
                                }
                            }
                        ]
                    }
                }
            ])
        });

        test('supports AS keyword for function calls', () => {
            expect(parseLambda('x => { RETURN rand() AS bar }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        statement: '',
                        return: [
                            {
                                name: 'bar',
                                original: {
                                    name: 'rand',
                                    type: 'functionCall',
                                    args: []
                                }
                            }
                        ]
                    }
                }
            ])
        });

        test('supports lowercase return keyword', () => {
            expect(parseLambda('x => { return rand() AS bar }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        statement: '',
                        return: [
                            {
                                name: 'bar',
                                original: {
                                    name: 'rand',
                                    type: 'functionCall',
                                    args: []
                                }
                            }
                        ]
                    }
                }
            ])
        });

        test('supports singleline anything before final return statement', () => {
            const statement = 'jdashjdlijasldjaslkdmla';

            expect(parseLambda(`x => { ${statement} return rand() AS bar }`)).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        statement,
                        return: [
                            {
                                name: 'bar',
                                original: {
                                    name: 'rand',
                                    type: 'functionCall',
                                    args: []
                                }
                            }
                        ]
                    }
                }
            ])
        });

        test('supports multiline anything before final return statement', () => {
            // whitespaces get a bit messed up in parser
            const statement = `jdashjdlijasldjaslkdmla
ldhasiudhaksdn
asdjokajsd
{ RETURN fooo }`;

            expect(parseLambda(`x => {
                ${statement}
                
                return rand() AS bar
            }`)).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        tokens: [
                            'x'
                        ]
                    },
                    body: {
                        statement,
                        return: [
                            {
                                name: 'bar',
                                original: {
                                    name: 'rand',
                                    type: 'functionCall',
                                    args: []
                                }
                            }
                        ]
                    }
                }
            ])
        });

        test('supports destructuring of lists', () => {
            expect(parseLambda('[x] => { RETURN rand() AS bar }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'token',
                                tokens: [
                                    'x'
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: '',
                        return: [
                            {
                                name: 'bar',
                                original: {
                                    type: 'functionCall',
                                    name: 'rand',
                                    args: []
                                }
                            }
                        ]
                    }
                }
            ])
        });

        test('supports destructuring of objects in lists', () => {
            expect(parseLambda('[{x}] => { RETURN rand() AS bar }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'object',
                                tokens: [
                                    'x'
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: '',
                        return: [
                            {
                                name: 'bar',
                                original: {
                                    type: 'functionCall',
                                    name: 'rand',
                                    args: []
                                }
                            }
                        ]
                    }
                }
            ])
        });

        test('supports multiple items in lists', () => {
            expect(parseLambda('[{x}, y] => { RETURN rand() AS bar }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'object',
                                tokens: [
                                    'x'
                                ]
                            },
                            {
                                type: 'token',
                                tokens: [
                                    'y'
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: '',
                        return: [
                            {
                                name: 'bar',
                                original: {
                                    type: 'functionCall',
                                    name: 'rand',
                                    args: []
                                }
                            }
                        ]
                    }
                }
            ])
        });
    });
});
