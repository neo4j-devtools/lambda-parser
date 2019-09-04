import {parseLambda} from './src';

const something = `[{x}] => { CALL db.labels() YIELD label




foo

RETURN 1
}`;
// const result1 = parseLambda(something)
const result2 = parseLambda('x => { \n \n \n asdsd RETURN rand() }')
// const result3 = parseLambda('[{rand():x}] => { RETURN rand() AS bar }')
// const result4 = parseLambda('x1 => "foo"')

console.log(JSON.stringify(result2, null, 2));
console.log(`Ambiguity ${result2.length}`)
