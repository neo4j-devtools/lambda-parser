import {parseLambda} from './src'

const something = `[{x}] => {
    CALL db.labels() YIELD label
    RETURN "foo".bar >= rand(58, abs(foo <> true), -1^3*((3-2)/1)) ENDS WITH bar <> 2
}`;
const result1 = parseLambda(something)
const result2 = parseLambda('x => {asdsd RETURN rand() }')
const result3 = parseLambda('[{rand():x}] => { RETURN rand() AS bar }')
const result4 = parseLambda('x1 => "foo"')

console.log(JSON.stringify(result1, null, 2));
console.log(`Ambiguity ${result1.length}`)
