@builtin "whitespace.ne"
@builtin "string.ne"
@builtin "number.ne"
@builtin "postprocessors.ne"
@preprocessor esmodule


# [foo, {bar}] => { RETURN ... }
# [foo, {bar}] => ...
lambda -> explicitParameters FAT_ARROW explicitReturn {% ([parameters,,body]) => ({type: 'lambda', variant: 'explicit', parameters, body}) %}
    | implicitParameters FAT_ARROW implicitReturn {% ([parameters,,body]) => ({type: 'lambda', variant: 'implicit', parameters, body}) %}

# { RETURN ... }
explicitReturn -> L_CURLY multiLine __ RETURN returnValues R_CURLY {% ([,statement,,, value]) => ({statement, return: value}) %}
    | L_CURLY singleLine __ RETURN returnValues R_CURLY {% ([,statement,,, value]) => ({statement, return: value}) %}
    | L_CURLY _ RETURN returnValues R_CURLY {% ([,,, value]) => ({statement: '', return: value}) %}

# [foo, {bar}] => ...
implicitReturn -> returnValue {% ([value]) => ({return: [value]}) %}

# RETURN hi AS foo, rand() AS bar
returnValues -> returnValue COMMA returnValues {% ([hit,, rest]) => [hit, ...rest] %}
    | returnValue

# RETURN hi AS foo
# RETURN rand() AS bar
returnValue -> functionCall AS token {% ([func,, name]) => ({name: name.value, from: [func]}) %}
    | functionCall objectPath AS token {% ([func, path,, name]) => ({name: name.value, from: [func, path]}) %}
    | token AS token {% ([token,, name]) => ({name: name.value, from: [token]}) %}
    | token objectPath AS token {% ([token, path,, name]) => ({name: name.value, from: [token, path]}) %}
    | number AS token {% ([num,, name]) => ({name: name.value, from: [num]}) %}
    | string AS token {% ([str,, name]) => ({name: name.value, from: [str]}) %}
    | token {% ([token]) => ({ name: token.value, from: [token]}) %}
    | token objectPath {% ([token, path]) => ({ name: `${token.value}${path.value}`, from: [token, path]}) %}
    | number {% ([num]) => ({ name: `${num.value}`, from: [num]}) %}
    | string {% ([str]) => ({ name: `"${str.value}"`, from: [str]}) %}
    | functionCall {% ([func]) => ({
        name: `${func.name}(${func.args.join()})`, // whitespace is lost...
        from: [func],
    }) %}
    | functionCall objectPath {% ([func, path]) => ({
        name: `${func.name}(${func.args.join()})${path.value}`, // whitespace is lost...
        from: [func, path],
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

objectPath -> L_SQUARE number R_SQUARE {% ([, index]) => ({type: 'path', variant: index.type, value: `[${index.value}]`}) %}
    | L_SQUARE string R_SQUARE {% ([, key]) => ({type: 'path', variant: key.type, value: `["${key.value}"]`}) %}
    | DOT token {% ([, key]) => ({type: 'path', variant: key.type, value: `.${key.value}`}) %}

# {foo, bar, baz}
object -> L_CURLY objectKeys R_CURLY {% ([, keys]) => ({type: 'object', keys}) %}

# foo, bar, baz
objectKeys -> objectKey COMMA objectKeys {% ([objectKey,, rest]) => [objectKey.value, ...rest] %}
   | objectKey {%([key]) => [key.value]%}

objectKey ->  functionCall _ COLON _ token {% nth(4) %}
    | token _ COLON _ token {% nth(4) %}
    | functionCall {% id %}
    | token {% id %}

# rand()
functionCall -> token L_PAREN tokens R_PAREN {% ([name,, args]) => ({type: 'functionCall', name: name.value, args}) %}
    | token L_PAREN R_PAREN {% ([name]) => ({type: 'functionCall', name: name.value, args: []}) %}

# foo, bar, baz
tokens -> token COMMA tokens {% ([token,, rest]) => [token.value, ...rest] %}
    | token {% ([token]) => [token.value] %}

string -> _ dqstring {% ([, value]) => ({type: 'string', value}) %}

number -> _ decimal {% ([, value]) => ({type: 'number', value}) %}

token -> _ chars {% ([, value]) => ({type: 'token', value}) %}

chars -> [a-zA-Z] [a-zA-Z0-9]:* {% ([value, rest]) => `${value}${rest.join('')}` %}

multiLine -> newLine singleLine multiLine {% ([, hit, rest], _ , reject) => rest ? [hit, rest].join('\n').trim() : reject %}
    | newLine {% id %}

singleLine -> [^\n]:+ {% ([hit], _, reject) => hit.join('').trim() %}

newLine -> [\n]:+ {% () => [] %}

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
AS -> _ "AS"i {% () => ['AS'] %}
