import {parseLambda} from './src'

const something = `x => abs(abs(500 <> "foo" =~ "o" NOT IN [a,[b, rand()],c]))`;
const result1 = parseLambda(something)

console.log(JSON.stringify(result1, null, 2));
console.log(`Ambiguity ${result1.length}`)
