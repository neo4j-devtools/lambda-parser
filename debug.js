import parseLambda from './parse-lambda';

const something = `[{x}] => { CALL db.labels() YIELD label




foo

RETURN 1
}`;
const result1 = parseLambda(something)
const result2 = parseLambda('x => {asdsd RETURN rand() }')
const result3 = parseLambda('[{rand():x}] => { RETURN rand() AS bar }')
const result4 = parseLambda('x1 => "foo"')

console.log(JSON.stringify(result1, null, 2));
console.log(`Ambiguity ${result1.length}`)
