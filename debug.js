import parseLambda from './parse-lambda';

const something = `[x] => {
    jdashjdlija   sldjaslkdmla
    asdadsadsad

    MATCH (n) RETURN n;
    CREATE (m {fooo})



sadasd
sadsndasjdpjaspd

{
    dasohdoiasjkm
    {
        dhakshdkjasnk
    }
}




    

asdasdn  asdasdasd 
    dansdhaskjd

    asdkjasndkljaslj
    
    return rand() AS bar
}`;
const result1 = parseLambda(something)
const result2 = parseLambda('x => {asdsd RETURN rand() }')
const result3 = parseLambda('[{x}] => { RETURN rand() AS bar }')
const result4 = parseLambda('x => rand()')

console.log(JSON.stringify(result3, null, 2));
console.log(`Ambiguity ${result3.length}`)