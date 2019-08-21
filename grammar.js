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
    {"name": "lambda", "symbols": ["complexParameters", "fatArrow", "explicitReturn"], "postprocess": ([parameters,,body]) => ({type: 'lambda', variant: 'explicit', parameters, body})},
    {"name": "lambda", "symbols": ["token", "fatArrow", "implicitReturn"], "postprocess": ([parameters,,body]) => ({type: 'lambda', variant: 'implicit', parameters, body})},
    {"name": "explicitReturn", "symbols": ["lCurly", "multiLine", "__", "return", "returnValues", "rCurly"], "postprocess": ([,statement,,, value]) => ({statement, return: value})},
    {"name": "explicitReturn", "symbols": ["lCurly", "singleLine", "__", "return", "returnValues", "rCurly"], "postprocess": ([,statement,,, value]) => ({statement, return: value})},
    {"name": "explicitReturn", "symbols": ["lCurly", "_", "return", "returnValues", "rCurly"], "postprocess": ([,,, value]) => ({statement: '', return: value})},
    {"name": "implicitReturn", "symbols": ["returnValue"], "postprocess": ([value]) => ({return: value})},
    {"name": "functionContents", "symbols": ["return", "returnValues"]},
    {"name": "returnValues", "symbols": ["returnValue"]},
    {"name": "returnValues", "symbols": ["returnValue", "comma", "returnValues"], "postprocess": ([hit,, rest]) => [hit, ...rest]},
    {"name": "returnValue", "symbols": ["functionCall", "as", "token"], "postprocess": ([original,, name]) => ({name: name.tokens[0], original})},
    {"name": "returnValue", "symbols": ["token", "as", "token"], "postprocess": ([original,, name]) => ({name: name.tokens[0], original})},
    {"name": "returnValue", "symbols": ["number", "as", "token"], "postprocess": ([original,, name]) => ({name: name.tokens[0], original})},
    {"name": "returnValue", "symbols": ["string", "as", "token"], "postprocess": ([original,, name]) => ({name: name.tokens[0], original})},
    {"name": "returnValue", "symbols": ["token"], "postprocess": ([original]) => ({ name: original.tokens[0], original})},
    {"name": "returnValue", "symbols": ["number"], "postprocess": ([original]) => ({ name: `${original.tokens[0]}`, original})},
    {"name": "returnValue", "symbols": ["string"], "postprocess": ([original]) => ({ name: `"${original.tokens[0]}"`, original})},
    {"name": "returnValue", "symbols": ["functionCall"], "postprocess":  ([original]) => ({
            name: `${original.name}(${original.args.join()})`, // whitespace is lost...
            original
        }) },
    {"name": "functionCall", "symbols": ["token", "lParen", "rParen"], "postprocess": ([name]) => ({type: 'functionCall', name: name.tokens[0], args: []})},
    {"name": "functionCall", "symbols": ["token", "lParen", "tokens", "rParen"], "postprocess": ([name,, args]) => ({type: 'functionCall', name: name.tokens[0], args})},
    {"name": "complexParameters", "symbols": ["array"], "postprocess": id},
    {"name": "complexParameters", "symbols": ["token"], "postprocess": id},
    {"name": "array", "symbols": ["lSquare", "parameters", "rSquare"], "postprocess": ([, items]) => ({type: 'array', items})},
    {"name": "parameters", "symbols": ["parameter", "comma", "parameters"], "postprocess": ([hit,, rest]) => [hit, ...rest]},
    {"name": "parameters", "symbols": ["parameter"], "postprocess": ([hit]) => [hit]},
    {"name": "parameter", "symbols": ["object"], "postprocess": id},
    {"name": "parameter", "symbols": ["token"], "postprocess": id},
    {"name": "object", "symbols": ["lCurly", "tokens", "rCurly"], "postprocess": ([, tokens]) => ({type: 'object', tokens})},
    {"name": "tokens", "symbols": ["token", "comma", "tokens"], "postprocess": ([token,, rest]) => [...token.tokens, ...rest]},
    {"name": "tokens", "symbols": ["token"], "postprocess": ([token]) => token.tokens},
    {"name": "string", "symbols": ["_", "dqstring"], "postprocess": ([, hit]) => ({type: 'string', tokens: [hit]})},
    {"name": "number", "symbols": ["_", "decimal"], "postprocess": ([, hit]) => ({type: 'number', tokens: [hit]})},
    {"name": "token", "symbols": ["_", "chars"], "postprocess": ([, hit]) => ({type: 'token', tokens: [hit]})},
    {"name": "chars$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "chars$ebnf$1", "symbols": ["chars$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "chars", "symbols": ["chars$ebnf$1"], "postprocess": ([hit]) => hit.join('')},
    {"name": "multiLine", "symbols": ["newLine"], "postprocess": id},
    {"name": "multiLine", "symbols": ["newLine", "singleLine", "multiLine"], "postprocess": ([, hit, rest], _ , reject) => rest ? [hit, rest].join('\n').trim() : reject},
    {"name": "singleLine$ebnf$1", "symbols": [/[^\n]/]},
    {"name": "singleLine$ebnf$1", "symbols": ["singleLine$ebnf$1", /[^\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "singleLine", "symbols": ["singleLine$ebnf$1"], "postprocess": ([hit], _, reject) => hit.join('').trim()},
    {"name": "newLine$ebnf$1", "symbols": [/[\n]/]},
    {"name": "newLine$ebnf$1", "symbols": ["newLine$ebnf$1", /[\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "newLine", "symbols": ["newLine$ebnf$1"], "postprocess": () => []},
    {"name": "comma", "symbols": ["_", {"literal":","}], "postprocess": () => ['COMMA']},
    {"name": "lSquare", "symbols": ["_", {"literal":"["}], "postprocess": () => ['L_SQUARE']},
    {"name": "rSquare", "symbols": ["_", {"literal":"]"}], "postprocess": () => ['R_SQUARE']},
    {"name": "lCurly", "symbols": ["_", {"literal":"{"}], "postprocess": () => ['L_CURLY']},
    {"name": "rCurly", "symbols": ["_", {"literal":"}"}], "postprocess": () => ['R_CURLY']},
    {"name": "lParen", "symbols": ["_", {"literal":"("}], "postprocess": () => ['L_PAREN']},
    {"name": "rParen", "symbols": ["_", {"literal":")"}], "postprocess": () => ['R_PAREN']},
    {"name": "fatArrow$string$1", "symbols": [{"literal":"="}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fatArrow", "symbols": ["_", "fatArrow$string$1"], "postprocess": () => ['F_ARROW']},
    {"name": "return$subexpression$1", "symbols": [/[rR]/, /[eE]/, /[tT]/, /[uU]/, /[rR]/, /[nN]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "return", "symbols": ["return$subexpression$1", "__"], "postprocess": () => ['RETURN']},
    {"name": "as$string$1", "symbols": [{"literal":"A"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "as", "symbols": ["_", "as$string$1"], "postprocess": () => ['AS']}
];
let ParserStart = "lambda";
export default { Lexer, ParserRules, ParserStart };
