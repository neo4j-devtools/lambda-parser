@builtin "whitespace.ne"
@builtin "string.ne"
@builtin "number.ne"
@builtin "postprocessors.ne"
@preprocessor esmodule


# [foo, {bar}] => { RETURN ... }
# foo => ...
lambda -> explicitParameters FAT_ARROW explicitReturn {% ([parameters,,body]) => ({type: 'lambda', variant: 'explicit', parameters, body}) %}
    | implicitParameters FAT_ARROW implicitReturn {% ([parameters,,body]) => ({type: 'lambda', variant: 'implicit', parameters, body}) %}

# { RETURN ... }
explicitReturn -> L_CURLY singleLine multiLine R_CURLY {% ([,statement1, statement2]) => ({statement: [statement1, statement2].join('\n').trim(), returnValues: []}) %}
    | L_CURLY multiLine R_CURLY {% ([,statement]) => ({statement, returnValues: []}) %}
    | L_CURLY singleLine R_CURLY {% ([,statement]) => ({statement, returnValues: []}) %}

# ...
implicitReturn -> singleLine {% ([statement], _, reject) => statement.trim().startsWith('{') ? reject : ({returnValues: []}) %}

# RETURN hi AS foo, rand() AS bar
returnValues -> returnValue COMMA returnValues {% ([hit,, rest]) => [hit, ...rest] %}
    | returnValue

# RETURN rand() AS bar
# RETURN hi
returnValue -> value AS token {% ([original,, name]) => ({...original, alias: name.value}) %}
    | value {% id %}

# RETURN hi
# RETURN rand()
value -> token {% ([token]) => ({ value: token.value, from: [token]}) %}
    | token nestedObjectPath {% ([token, path]) => ({ value: `${token.value}${path.map(({value}) => value).join('')}`, from: [token, ...path]}) %}
    | number {% ([num]) => ({ value: `${num.value}`, from: [num]}) %}
    | string {% ([str]) => ({ value: `"${str.value}"`, from: [str]}) %}
    | functionCall {% ([func]) => ({
        value: func.value,
        from: [func],
    }) %}
    | functionCall nestedObjectPath {% ([func, path]) => ({
        value: `${func.value}${path.map(({value}) => value).join('')}`,
        from: [func, ...path],
    }) %}

# [x]
# x
explicitParameters -> array {% id %}
    | token {% id %}

# x
implicitParameters -> token {% id %}

# [foo, {bar, baz}]
array -> L_SQUARE items R_SQUARE {% ([, items]) => ({type: 'array', items}) %}

# foo, bar, baz
items -> item COMMA items {% ([hit,, rest]) => [hit, ...rest] %}
    | item {% ([hit]) => [hit] %}

# foo
# {foo}
item -> object {% id %}
    | token {% id %}

# [0].foo["yolo"]
nestedObjectPath -> objectPath nestedObjectPath {% ([path, rest]) => [path, ...rest] %}
    | objectPath

# [0]
# ["hurr durr"]
# .foo
objectPath -> L_SQUARE number R_SQUARE {% ([, index]) => ({type: 'path', variant: index.type, value: `[${index.value}]`}) %}
    | L_SQUARE string R_SQUARE {% ([, key]) => ({type: 'path', variant: key.type, value: `["${key.value}"]`}) %}
    | DOT token {% ([, key]) => ({type: 'path', variant: key.type, value: `.${key.value}`}) %}

# {foo, bar, baz}
object -> L_CURLY objectKeys R_CURLY {% ([, keys]) => ({type: 'object', keys}) %}

# foo, bar, baz
objectKeys -> objectKey COMMA objectKeys {% ([objectKey,, rest]) => [objectKey, ...rest] %}
   | objectKey {%([key]) => [key]%}

objectKey ->  functionCall COLON token {% ([func,, alias]) => ({...func, alias: alias.value}) %}
    | token COLON token {% ([token,, alias]) => ({...token, alias: alias.value}) %}
    | functionCall {% id %}
    | token {% id %}

# rand()
# whitespace is intentionally omitted
functionCall -> token L_PAREN functionArgs R_PAREN {% ([name,, args]) => ({type: 'functionCall', name: name.value, value: `${name.value}(${args.map(({value}) => value).join()})`, args}) %}
    | token L_PAREN R_PAREN {% ([name]) => ({type: 'functionCall', name: name.value, value: `${name.value}()`, args: []}) %}

# foo, bar, baz
functionArgs -> token COMMA functionArgs {% ([token,, rest]) => [token, ...rest] %}
    | token {% ([token]) => [token] %}

string -> _ dqstring {% ([, value]) => ({type: 'string', value}) %}

number -> _ decimal {% ([, value]) => ({type: 'number', value}) %}

token -> _ chars {% ([, value]) => ({type: 'token', value}) %}

chars -> [a-zA-Z] [a-zA-Z0-9]:* {% ([value, rest]) => `${value}${rest.join('')}` %}

multiLine -> newLine singleLine multiLine {% ([, hit, rest], _ , reject) => rest ? [hit, rest].join('\n').trim() : reject %}
    | newLine multiLine {% ([hit, rest]) => [hit, rest].join('\n').trim() %} # щ（ﾟДﾟщ）
    | newLine singleLine {% ([hit, rest]) => [hit, rest].join('\n').trim() %}
    | newLine {% id %}

singleLine -> [^\n]:+ {% ([hit], _, reject) => hit.join('').trim() %}

newLine -> [\n] {% () => [] %}

DOT -> _ "." {% () => ['DOT'] %}
COMMA -> _ "," {% () => ['COMMA'] %}
COLON -> _ ":" {% () => ['COLON'] %}
L_SQUARE -> _ "[" {% () => ['L_SQUARE'] %}
R_SQUARE -> _ "]" {% () => ['R_SQUARE'] %}
L_CURLY -> _ "{" {% () => ['L_CURLY'] %}
R_CURLY -> _ "}" {% () => ['R_CURLY'] %}
L_PAREN -> _ "(" {% () => ['L_PAREN'] %}
R_PAREN -> _ ")" {% () => ['R_PAREN'] %}
FAT_ARROW -> _ "=>" {% () => ['F_ARROW'] %}
RETURN -> "RETURN"i __ {% () => ['RETURN'] %}
AS -> __ "AS"i {% () => ['AS'] %}
