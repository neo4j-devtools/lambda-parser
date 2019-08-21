// Generated automatically by nearley, version 2.18.0
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }

// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function nth(n) {
    return function(d) {
        return d[n];
    };
}


// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function $(o) {
    return function(d) {
        var ret = {};
        Object.keys(o).forEach(function(k) {
            ret[k] = d[o[k]];
        });
        return ret;
    };
}
let Lexer = undefined;
let ParserRules = [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "lambda", "symbols": ["explicitParameters", "FAT_ARROW", "explicitReturn"], "postprocess": ([parameters,,body]) => ({type: 'lambda', variant: 'explicit', parameters, body})},
    {"name": "lambda", "symbols": ["implicitParameters", "FAT_ARROW", "implicitReturn"], "postprocess": ([parameters,,body]) => ({type: 'lambda', variant: 'implicit', parameters, body})},
    {"name": "explicitReturn", "symbols": ["L_CURLY", "multiLine", "__", "RETURN", "returnValues", "R_CURLY"], "postprocess": ([,statement,,, value]) => ({statement, return: value})},
    {"name": "explicitReturn", "symbols": ["L_CURLY", "singleLine", "__", "RETURN", "returnValues", "R_CURLY"], "postprocess": ([,statement,,, value]) => ({statement, return: value})},
    {"name": "explicitReturn", "symbols": ["L_CURLY", "_", "RETURN", "returnValues", "R_CURLY"], "postprocess": ([,,, value]) => ({statement: '', return: value})},
    {"name": "implicitReturn", "symbols": ["returnValue"], "postprocess": ([value]) => ({return: [value]})},
    {"name": "returnValues", "symbols": ["returnValue", "COMMA", "returnValues"], "postprocess": ([hit,, rest]) => [hit, ...rest]},
    {"name": "returnValues", "symbols": ["returnValue"]},
    {"name": "returnValue", "symbols": ["functionCall", "AS", "token"], "postprocess": ([func,, name]) => ({name: name.value, from: [func]})},
    {"name": "returnValue", "symbols": ["functionCall", "objectPath", "AS", "token"], "postprocess": ([func, path,, name]) => ({name: name.value, from: [func, path]})},
    {"name": "returnValue", "symbols": ["token", "AS", "token"], "postprocess": ([token,, name]) => ({name: name.value, from: [token]})},
    {"name": "returnValue", "symbols": ["token", "objectPath", "AS", "token"], "postprocess": ([token, path,, name]) => ({name: name.value, from: [token, path]})},
    {"name": "returnValue", "symbols": ["number", "AS", "token"], "postprocess": ([num,, name]) => ({name: name.value, from: [num]})},
    {"name": "returnValue", "symbols": ["string", "AS", "token"], "postprocess": ([str,, name]) => ({name: name.value, from: [str]})},
    {"name": "returnValue", "symbols": ["token"], "postprocess": ([token]) => ({ name: token.value, from: [token]})},
    {"name": "returnValue", "symbols": ["token", "objectPath"], "postprocess": ([token, path]) => ({ name: `${token.value}${path.value}`, from: [token, path]})},
    {"name": "returnValue", "symbols": ["number"], "postprocess": ([num]) => ({ name: `${num.value}`, from: [num]})},
    {"name": "returnValue", "symbols": ["string"], "postprocess": ([str]) => ({ name: `"${str.value}"`, from: [str]})},
    {"name": "returnValue", "symbols": ["functionCall"], "postprocess":  ([func]) => ({
            name: `${func.name}(${func.args.join()})`, // whitespace is lost...
            from: [func],
        }) },
    {"name": "returnValue", "symbols": ["functionCall", "objectPath"], "postprocess":  ([func, path]) => ({
            name: `${func.name}(${func.args.join()})${path.value}`, // whitespace is lost...
            from: [func, path],
        }) },
    {"name": "explicitParameters", "symbols": ["array"], "postprocess": id},
    {"name": "explicitParameters", "symbols": ["token"], "postprocess": id},
    {"name": "implicitParameters", "symbols": ["token"], "postprocess": id},
    {"name": "array", "symbols": ["L_SQUARE", "items", "R_SQUARE"], "postprocess": ([, items]) => ({type: 'array', items})},
    {"name": "items", "symbols": ["item", "COMMA", "items"], "postprocess": ([hit,, rest]) => [hit, ...rest]},
    {"name": "items", "symbols": ["item"], "postprocess": ([hit]) => [hit]},
    {"name": "item", "symbols": ["object"], "postprocess": id},
    {"name": "item", "symbols": ["token"], "postprocess": id},
    {"name": "objectPath", "symbols": ["L_SQUARE", "number", "R_SQUARE"], "postprocess": ([, index]) => ({type: 'path', variant: index.type, value: `[${index.value}]`})},
    {"name": "objectPath", "symbols": ["L_SQUARE", "string", "R_SQUARE"], "postprocess": ([, key]) => ({type: 'path', variant: key.type, value: `["${key.value}"]`})},
    {"name": "objectPath", "symbols": ["DOT", "token"], "postprocess": ([, key]) => ({type: 'path', variant: key.type, value: `.${key.value}`})},
    {"name": "object", "symbols": ["L_CURLY", "objectKeys", "R_CURLY"], "postprocess": ([, keys]) => ({type: 'object', keys})},
    {"name": "objectKeys", "symbols": ["objectKey", "COMMA", "objectKeys"], "postprocess": ([objectKey,, rest]) => [objectKey.value, ...rest]},
    {"name": "objectKeys", "symbols": ["objectKey"], "postprocess": ([key]) => [key.value]},
    {"name": "objectKey", "symbols": ["functionCall", "_", "COLON", "_", "token"], "postprocess": nth(4)},
    {"name": "objectKey", "symbols": ["token", "_", "COLON", "_", "token"], "postprocess": nth(4)},
    {"name": "objectKey", "symbols": ["functionCall"], "postprocess": id},
    {"name": "objectKey", "symbols": ["token"], "postprocess": id},
    {"name": "functionCall", "symbols": ["token", "L_PAREN", "tokens", "R_PAREN"], "postprocess": ([name,, args]) => ({type: 'functionCall', name: name.value, args})},
    {"name": "functionCall", "symbols": ["token", "L_PAREN", "R_PAREN"], "postprocess": ([name]) => ({type: 'functionCall', name: name.value, args: []})},
    {"name": "tokens", "symbols": ["token", "COMMA", "tokens"], "postprocess": ([token,, rest]) => [token.value, ...rest]},
    {"name": "tokens", "symbols": ["token"], "postprocess": ([token]) => [token.value]},
    {"name": "string", "symbols": ["_", "dqstring"], "postprocess": ([, value]) => ({type: 'string', value})},
    {"name": "number", "symbols": ["_", "decimal"], "postprocess": ([, value]) => ({type: 'number', value})},
    {"name": "token", "symbols": ["_", "chars"], "postprocess": ([, value]) => ({type: 'token', value})},
    {"name": "chars$ebnf$1", "symbols": []},
    {"name": "chars$ebnf$1", "symbols": ["chars$ebnf$1", /[a-zA-Z0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "chars", "symbols": [/[a-zA-Z]/, "chars$ebnf$1"], "postprocess": ([value, rest]) => `${value}${rest.join('')}`},
    {"name": "multiLine", "symbols": ["newLine", "singleLine", "multiLine"], "postprocess": ([, hit, rest], _ , reject) => rest ? [hit, rest].join('\n').trim() : reject},
    {"name": "multiLine", "symbols": ["newLine"], "postprocess": id},
    {"name": "singleLine$ebnf$1", "symbols": [/[^\n]/]},
    {"name": "singleLine$ebnf$1", "symbols": ["singleLine$ebnf$1", /[^\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "singleLine", "symbols": ["singleLine$ebnf$1"], "postprocess": ([hit], _, reject) => hit.join('').trim()},
    {"name": "newLine$ebnf$1", "symbols": [/[\n]/]},
    {"name": "newLine$ebnf$1", "symbols": ["newLine$ebnf$1", /[\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "newLine", "symbols": ["newLine$ebnf$1"], "postprocess": () => []},
    {"name": "DOT", "symbols": ["_", {"literal":"."}], "postprocess": () => ['DOT']},
    {"name": "COMMA", "symbols": ["_", {"literal":","}], "postprocess": () => ['COMMA']},
    {"name": "COLON", "symbols": ["_", {"literal":":"}], "postprocess": () => ['COLON']},
    {"name": "L_SQUARE", "symbols": ["_", {"literal":"["}], "postprocess": () => ['L_SQUARE']},
    {"name": "R_SQUARE", "symbols": ["_", {"literal":"]"}], "postprocess": () => ['R_SQUARE']},
    {"name": "L_CURLY", "symbols": ["_", {"literal":"{"}], "postprocess": () => ['L_CURLY']},
    {"name": "R_CURLY", "symbols": ["_", {"literal":"}"}], "postprocess": () => ['R_CURLY']},
    {"name": "L_PAREN", "symbols": ["_", {"literal":"("}], "postprocess": () => ['L_PAREN']},
    {"name": "R_PAREN", "symbols": ["_", {"literal":")"}], "postprocess": () => ['R_PAREN']},
    {"name": "FAT_ARROW$string$1", "symbols": [{"literal":"="}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "FAT_ARROW", "symbols": ["_", "FAT_ARROW$string$1"], "postprocess": () => ['F_ARROW']},
    {"name": "RETURN$subexpression$1", "symbols": [/[rR]/, /[eE]/, /[tT]/, /[uU]/, /[rR]/, /[nN]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "RETURN", "symbols": ["RETURN$subexpression$1", "__"], "postprocess": () => ['RETURN']},
    {"name": "AS$subexpression$1", "symbols": [/[aA]/, /[sS]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "AS", "symbols": ["_", "AS$subexpression$1"], "postprocess": () => ['AS']}
];
let ParserStart = "lambda";
export default { Lexer, ParserRules, ParserStart };
