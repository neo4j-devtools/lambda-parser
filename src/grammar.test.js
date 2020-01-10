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
                        value: 'x'
                    },
                    body: {
                        returnValues: []
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
                        returnValues: []
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
                        returnValues: []
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
                        returnValues: []
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
                        returnValues: []
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
                        returnValues: []
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
                        returnValues: []
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
                        returnValues: []
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
                        returnValues: []
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
                        returnValues: []
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
                        returnValues: []
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
                        returnValues: []
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
                        returnValues: []
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
                        returnValues: []
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
                        returnValues: []
                    }
                }
            ])
        });

        test('Supports returning objects wrapped in parens', () => {
            const query = `x => ({foo: 1})`;

            expect(parseLambda(query)).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        returnValues: []
                    }
                }
            ])
        });

        test('Supports returning objects wrapped in parens even with new lines', () => {
            const query = `x => ({
                foo: 1
            })`;

            expect(parseLambda(query)).toEqual([
                {
                    type: 'lambda',
                    variant: 'implicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        returnValues: []
                    }
                },
                expect.anything()
            ])
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
                        value: 'x'
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('support tokens with numbers in their names', () => {
            expect(parseLambda('x1 => { RETURN "foo" }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        value: 'x1'
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('does not support tokens with numbers first in their names', () => {
            expect(() => parseLambda('1x => { RETURN "foo" }')).toThrow('Syntax error at line 1 col 1:');
        });

        test('supports integers', () => {
            expect(parseLambda('x => { RETURN 1 }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('supports floats', () => {
            expect(parseLambda('x => { RETURN 1.1 }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('supports function calls', () => {
            expect(parseLambda('x => { RETURN rand() }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('supports function calls with parameters', () => {
            expect(parseLambda('x => { RETURN foo(a,b,c) }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('ignores whitespace in function calls with parameters', () => {
            expect(parseLambda('x => { RETURN foo ( a , b,   c  ) }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('supports AS keyword for simple values', () => {
            expect(parseLambda('x => { RETURN "foo" AS bar }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('supports AS keyword for function calls', () => {
            expect(parseLambda('x => { RETURN rand() AS bar }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('supports AS keyword regardless of casing', () => {
            expect(parseLambda('x => { RETURN rand() as bar }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('supports lowercase return keyword', () => {
            expect(parseLambda('x => { return rand() AS bar }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('supports singleline anything before final return statement', () => {
            const statement = 'jdashjdlijasldjaslkdmla CREATE (n {foo: 1})';

            expect(parseLambda(`x => { ${statement} return rand() AS bar }`)).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'token',
                        value: 'x'
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
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
                        value: 'x'
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
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
                                value: 'x'
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
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
                                keys: [
                                    {type: 'token', value: 'x'}
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
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
                                keys: [
                                    {type: 'token', value: 'x'}
                                ]
                            },
                            {
                                type: 'token',
                                value: 'y'
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('supports renaming of destructured objects keys when returning functions', () => {
            expect(parseLambda('[{rand():x}] => { RETURN rand() }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'object',
                                keys: [
                                    {
                                        type: 'functionCall',
                                        name: 'rand',
                                        value: 'rand()',
                                        alias: 'x',
                                        args: []
                                    }
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('supports renaming of destructured objects keys when returning renamed functions ', () => {
            expect(parseLambda('[{bar:x}] => { RETURN rand() AS bar }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'object',
                                keys: [
                                    {type: 'token', value: 'bar', alias: 'x'}
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('supports renaming of destructured objects keys when returning tokens ', () => {
            expect(parseLambda('[{bar:x}] => { RETURN bar }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'object',
                                keys: [
                                    {type: 'token', value: 'bar', alias: 'x'}
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('Does not increase ambiguity when having whitespaces between renamed tokens', () => {
            expect(parseLambda('[{bar, baz: y}] => { RETURN rand() as bar }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'object',
                                keys: [
                                    {type: 'token', value: 'bar'},
                                    {type: 'token', value: 'baz', alias: 'y'}
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('supports renaming of destructured objects keys when returning renamed values ', () => {
            expect(parseLambda('[{bar:x}] => { RETURN "foo" AS bar }')).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'object',
                                keys: [
                                    {type: 'token', value: 'bar', alias: 'x'}
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('does not increase ambiguity with additional new lines', () => {
            const query = `[{x}] => {
                CALL db.labels() YIELD label
                
                
                
                
                
                RETURN COLLECT(label)[0]
            }`;
            expect(parseLambda(query)).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'object',
                                keys: [
                                    {type: 'token', value: 'x'}
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('supports mix of single line and multi line', () => {
            const query = `[{x}] => { CALL db.labels() YIELD label
                
                
                
                foo
                
                RETURN COLLECT(label)[0]
            }`;
            expect(parseLambda(query)).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'object',
                                keys: [
                                    {type: 'token', value: 'x'}
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('Supports returning function calls with object path (number)', () => {
            const query = `[{x}] => {
                CALL db.labels() YIELD label
                RETURN COLLECT(label)[0]
            }`;
            expect(parseLambda(query)).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'object',
                                keys: [
                                    {type: 'token', value: 'x'}
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('Supports returning function calls with object path (string)', () => {
            const query = `[{x}] => {
                CALL db.labels() YIELD label
                RETURN COLLECT(label)["123 hurr durr"]
            }`;
            expect(parseLambda(query)).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'object',
                                keys: [
                                    {type: 'token', value: 'x'}
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('Supports returning function calls with object path (token)', () => {
            const query = `[{x}] => {
                CALL db.labels() YIELD label
                RETURN COLLECT(label).foo
            }`;
            expect(parseLambda(query)).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'object',
                                keys: [
                                    {type: 'token', value: 'x'}
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('Supports returning function calls with deep object path', () => {
            const query = `[{x}] => {
                CALL db.labels() YIELD label
                RETURN COLLECT(label)[0].foo["yolo"]
            }`;
            expect(parseLambda(query)).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'object',
                                keys: [
                                    {type: 'token', value: 'x'}
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });

        test('Supports returning function calls with object path using AS', () => {
            const query = `[{x}] => {
                CALL db.labels() YIELD label
                RETURN COLLECT(label)[0] AS foo
            }`;
            expect(parseLambda(query)).toEqual([
                {
                    type: 'lambda',
                    variant: 'explicit',
                    parameters: {
                        type: 'array',
                        items: [
                            {
                                type: 'object',
                                keys: [
                                    {type: 'token', value: 'x'}
                                ]
                            }
                        ]
                    },
                    body: {
                        statement: expect.anything(),
                        returnValues: []
                    }
                },
                expect.anything()
            ])
        });
    });
});
