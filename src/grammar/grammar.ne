@builtin "postprocessors.ne"
@preprocessor esmodule

@include "./constants.ne"
@include "./primitives.ne"
@include "./math.ne"
@include "./operators.ne"

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
returnValue -> complexValue AS token {% ([original,, name]) => ({...original, alias: name.value}) %}
    | complexValue {% id %}

complexValue -> 
    value operator complexValue {% ([value, op, ...rest]) => ({
        value: `${getDisplayValue(value)} ${op.value} ${rest.map(({value}) => value).join('')}`,
        type: 'complex',
        from: [value, op, ...rest]
    }) %}
    | value nestedObjectPath operator complexValue {% ([value, path, op, ...rest]) => ({ 
        value: `${getDisplayValue(value)}${path.map(({value}) => value).join('')} ${op.value} ${rest.map(({value}) => value).join('')}`,
        type: 'complex',
        from: [value, op, ...path, ...rest]
    }) %}
    | value nestedObjectPath {% ([value, path]) => ({ value: `${getDisplayValue(value)}${path.map(({value}) => value).join('')}`, from: [value, ...path]}) %}
    | value {% ([value]) => ({value: getDisplayValue(value), from: [value]}) %}

# Temporary stopgap until we can figure out a better strategy for strings
@{%
function getDisplayValue(token) {
    return token.type === 'string' ? `"${token.value}"` : `${token.value}`
}
%}

# RETURN hi
# RETURN rand()
value -> token {% id %}
    | equation {% id %}
    | string {% id %}
    | functionCall {% id %}

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
# @todo: add numericals and equations
functionArgs -> token COMMA functionArgs {% ([token,, rest]) => [token, ...rest] %}
    | token {% ([token]) => [token] %}
