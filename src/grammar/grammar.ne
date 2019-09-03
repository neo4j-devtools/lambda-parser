@builtin "postprocessors.ne"
@preprocessor esmodule

@include "./constants.ne"
@include "./primitives.ne"
@include "./functions.ne"
@include "./math.ne"

# [foo, {bar}] => { RETURN ... }
# foo => ...
lambda -> explicitParameters FAT_ARROW explicitReturn {% ([parameters,,body]) => ({type: 'lambda', variant: 'explicit', parameters, body}) %}
    | implicitParameters FAT_ARROW implicitReturn {% ([parameters,,body]) => ({type: 'lambda', variant: 'implicit', parameters, body}) %}

# { RETURN ... }
explicitReturn -> L_CURLY singleLine multiLine __ RETURN returnValues R_CURLY {% ([,statement1, statement2,,, returnValues]) => ({statement: [statement1, statement2].join('\n').trim(), returnValues}) %}
    | L_CURLY multiLine __ RETURN returnValues R_CURLY {% ([,statement,,, returnValues]) => ({statement, returnValues}) %}
    | L_CURLY singleLine __ RETURN returnValues R_CURLY {% ([,statement,,, returnValues]) => ({statement, returnValues}) %}
    | L_CURLY _ RETURN returnValues R_CURLY {% ([,,, returnValues]) => ({statement: '', returnValues}) %}

# ...
implicitReturn -> returnValue {% ([returnValue]) => ({returnValues: [returnValue]}) %}

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
    | equation {% ([eq]) => ({ value: `${eq.value}`, from: [eq]}) %}
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
