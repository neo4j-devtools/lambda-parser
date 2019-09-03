@builtin "string.ne"
@builtin "number.ne"

@include "./constants.ne"

string -> _ dqstring {% ([, value]) => ({type: 'string', value}) %}

number -> _ decimal {% ([, value]) => ({type: 'number', value}) %}

token -> _ chars {% ([, value]) => ({type: 'token', value}) %}

chars -> [a-zA-Z] [a-zA-Z0-9]:* {% ([value, rest]) => `${value}${rest.join('')}` %}

multiLine -> newLine singleLine multiLine {% ([, hit, rest], _ , reject) => rest ? [hit, rest].join('\n').trim() : reject %}
    | newLine multiLine {% ([hit, rest]) => [hit, rest].join('\n').trim() %} # щ（ﾟДﾟщ）
    | newLine {% id %}

singleLine -> [^\n]:+ {% ([hit], _, reject) => hit.join('').trim() %}

newLine -> [\n] {% () => [] %}