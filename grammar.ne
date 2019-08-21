@builtin "whitespace.ne"
@builtin "string.ne"
@builtin "number.ne"
@builtin "postprocessors.ne"
@preprocessor esmodule


# [foo, {bar}] => { RETURN ... }
# [foo, {bar}] => ...
lambda -> complexParameters fatArrow explicitReturn {% ([parameters,,body]) => ({type: 'lambda', variant: 'explicit', parameters, body}) %}
    | token fatArrow implicitReturn {% ([parameters,,body]) => ({type: 'lambda', variant: 'implicit', parameters, body}) %}

# { RETURN ... }
explicitReturn -> lCurly multiLine __ return returnValues rCurly {% ([,statement,,, value]) => ({statement, return: value}) %}
    | lCurly singleLine __ return returnValues rCurly {% ([,statement,,, value]) => ({statement, return: value}) %}
    | lCurly _ return returnValues rCurly {% ([,,, value]) => ({statement: '', return: value}) %}

# [foo, {bar}] => ...
implicitReturn -> returnValue {% ([value]) => ({return: value}) %}

# only RETURN at the moment
functionContents -> return returnValues 

# RETURN hi as foo, rand() as bar
returnValues -> returnValue
    | returnValue comma returnValues {% ([hit,, rest]) => [hit, ...rest] %}

# RETURN hi as foo
# RETURN rand() as bar
returnValue -> functionCall as token {% ([original,, name]) => ({name: name.tokens[0], original}) %}
    | token as token  {% ([original,, name]) => ({name: name.tokens[0], original}) %}
    | number as token  {% ([original,, name]) => ({name: name.tokens[0], original}) %}
    | string as token  {% ([original,, name]) => ({name: name.tokens[0], original}) %}
    | token {% ([original]) => ({ name: original.tokens[0], original}) %}
    | number {% ([original]) => ({ name: `${original.tokens[0]}`, original}) %}
    | string {% ([original]) => ({ name: `"${original.tokens[0]}"`, original}) %}
    | functionCall {% ([original]) => ({
        name: `${original.name}(${original.args.join()})`, // whitespace is lost...
        original
    }) %}

# rand()
functionCall -> token lParen rParen {% ([name]) => ({type: 'functionCall', name: name.tokens[0], args: []}) %}
    | token lParen tokens rParen {% ([name,, args]) => ({type: 'functionCall', name: name.tokens[0], args}) %}

# [x]
# x
complexParameters -> array {% id %}
    | token {% id %}

# [foo, {bar, baz}]
array -> lSquare parameters rSquare {% ([, items]) => ({type: 'array', items}) %}

# foo, bar, baz
parameters -> parameter comma parameters {% ([hit,, rest]) => [hit, ...rest] %}
    | parameter {% ([hit]) => [hit] %}

# foo
# {foo}
parameter -> object {% id %}
   | token {% id %}

# {foo, bar, baz}
object -> lCurly tokens rCurly {% ([, tokens]) => ({type: 'object', tokens}) %}

# foo, bar, baz
tokens -> token comma tokens {% ([token,, rest]) => [...token.tokens, ...rest] %}
   | token {% ([token]) => token.tokens %}

string -> _ dqstring {% ([, hit]) => ({type: 'string', tokens: [hit]}) %}

number -> _ decimal {% ([, hit]) => ({type: 'number', tokens: [hit]}) %}

token -> _ chars {% ([, hit]) => ({type: 'token', tokens: [hit]}) %}

chars -> [a-zA-Z]:+ {% ([hit]) => hit.join('') %}

multiLine -> newLine {% id %}
    | newLine singleLine multiLine {% ([, hit, rest], _ , reject) => rest ? [hit, rest].join('\n').trim() : reject %}

singleLine -> [^\n]:+ {% ([hit], _, reject) => hit.join('').trim() %}

newLine -> [\n]:+ {% () => [] %}

comma -> _ "," {% () => ['COMMA'] %}
lSquare -> _ "[" {% () => ['L_SQUARE'] %}
rSquare -> _ "]" {% () => ['R_SQUARE'] %}
lCurly -> _ "{" {% () => ['L_CURLY'] %}
rCurly -> _ "}" {% () => ['R_CURLY'] %}
lParen -> _ "(" {% () => ['L_PAREN'] %}
rParen -> _ ")" {% () => ['R_PAREN'] %}
fatArrow -> _ "=>" {% () => ['F_ARROW'] %}
return -> "RETURN"i __ {% () => ['RETURN'] %}
as -> _ "AS" {% () => ['AS'] %}