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


function getCalcValue (left, op, right) {
	switch(`${op}`) {
		case 'POW':
			return `${left.value} ^ ${right.value}`
		case 'PLUS':
			return `${left.value} + ${right.value}`
		case 'MINUS':
			return `${left.value} - ${right.value}`
		case 'TIMES':
			return `${left.value} * ${right.value}`
		case 'DIVISION':
			return `${left.value} / ${right.value}`
		case 'MODULO':
			return `${left.value} % ${right.value}`
		default:
			throw new Error(`${op} not yet supported`)
	}
}


function getCalcResult (left, op, right) {
    const leftResult = left.result || left.value
    const rightResult = right.result || right.value

	switch(`${op}`) {
		case 'POW':
			return Math.pow(leftResult, rightResult)
		case 'PLUS':
			return leftResult + rightResult
		case 'MINUS':
			return leftResult - rightResult
		case 'TIMES':
			return leftResult * rightResult
		case 'DIVISION':
			return leftResult / rightResult
		case 'MODULO':
			return leftResult % rightResult
		default:
			throw new Error(`${op} not yet supported`)
	}
}


function getDisplayValue(token) {
    return token.type === 'string' ? `"${token.value}"` : `${token.value}`
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
    {"name": "AS", "symbols": ["__", "AS$subexpression$1"], "postprocess": () => ['AS']},
    {"name": "TILDE", "symbols": ["__", {"literal":"~"}], "postprocess": () => ['TILDE']},
    {"name": "DOT", "symbols": ["_", {"literal":"."}], "postprocess": () => ['DOT']},
    {"name": "PLUS", "symbols": ["_", {"literal":"+"}], "postprocess": () => ['PLUS']},
    {"name": "MINUS", "symbols": ["_", {"literal":"-"}], "postprocess": () => ['MINUS']},
    {"name": "TIMES", "symbols": ["_", {"literal":"*"}], "postprocess": () => ['TIMES']},
    {"name": "DIVISION", "symbols": ["_", {"literal":"/"}], "postprocess": () => ['DIVISION']},
    {"name": "MODULO", "symbols": ["_", {"literal":"%"}], "postprocess": () => ['MODULO']},
    {"name": "POW", "symbols": ["_", {"literal":"^"}], "postprocess": () => ['POW']},
    {"name": "EQUALITY", "symbols": ["_", {"literal":"="}], "postprocess": () => ['EQUALITY']},
    {"name": "PLUS_EQUALITY", "symbols": ["PLUS", "EQUALITY"], "postprocess": () => ['PLUS_EQUALITY']},
    {"name": "LESS_THAN", "symbols": ["_", {"literal":"<"}], "postprocess": () => ['LESS_THAN']},
    {"name": "LESS_THAN_OR_EQUALITY", "symbols": ["LESS_THAN", "EQUALITY"], "postprocess": () => ['LESS_THAN_OR_EQUALITY']},
    {"name": "GREATER_THAN", "symbols": ["_", {"literal":">"}], "postprocess": () => ['GREATER_THAN']},
    {"name": "GREATER_THAN_OR_EQUALITY", "symbols": ["GREATER_THAN", "EQUALITY"], "postprocess": () => ['GREATER_THAN_OR_EQUALITY']},
    {"name": "INEQUALITY", "symbols": ["LESS_THAN", "GREATER_THAN"], "postprocess": () => ['INEQUALITY']},
    {"name": "REGEX_MATCH", "symbols": ["EQUALITY", "TILDE"], "postprocess": () => ['REGEX_MATCH']},
    {"name": "AND$subexpression$1", "symbols": [/[aA]/, /[nN]/, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "AND", "symbols": ["__", "AND$subexpression$1", "__"], "postprocess": () => ['AND']},
    {"name": "CONTAINS$subexpression$1", "symbols": [/[cC]/, /[oO]/, /[nN]/, /[tT]/, /[aA]/, /[iI]/, /[nN]/, /[sS]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "CONTAINS", "symbols": ["__", "CONTAINS$subexpression$1", "__"], "postprocess": () => ['CONTAINS']},
    {"name": "DISTINCT$subexpression$1", "symbols": [/[dD]/, /[iI]/, /[sS]/, /[tT]/, /[iI]/, /[nN]/, /[cC]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "DISTINCT", "symbols": ["__", "DISTINCT$subexpression$1", "__"], "postprocess": () => ['DISTINCT']},
    {"name": "ENDS_WITH$subexpression$1", "symbols": [/[eE]/, /[nN]/, /[dD]/, /[sS]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "ENDS_WITH$subexpression$2", "symbols": [/[wW]/, /[iI]/, /[tT]/, /[hH]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "ENDS_WITH", "symbols": ["__", "ENDS_WITH$subexpression$1", "__", "ENDS_WITH$subexpression$2", "__"], "postprocess": () => ['ENDS_WITH']},
    {"name": "IN$subexpression$1", "symbols": [/[iI]/, /[nN]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "IN", "symbols": ["__", "IN$subexpression$1", "__"], "postprocess": () => ['IN']},
    {"name": "IS_NOT_NULL$subexpression$1", "symbols": [/[iI]/, /[sS]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "IS_NOT_NULL$subexpression$2", "symbols": [/[nN]/, /[oO]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "IS_NOT_NULL$subexpression$3", "symbols": [/[nN]/, /[uU]/, /[lL]/, /[lL]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "IS_NOT_NULL", "symbols": ["__", "IS_NOT_NULL$subexpression$1", "__", "IS_NOT_NULL$subexpression$2", "__", "IS_NOT_NULL$subexpression$3", "__"], "postprocess": () => ['IS_NOT_NULL']},
    {"name": "IS_NULL$subexpression$1", "symbols": [/[iI]/, /[sS]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "IS_NULL$subexpression$2", "symbols": [/[nN]/, /[uU]/, /[lL]/, /[lL]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "IS_NULL", "symbols": ["__", "IS_NULL$subexpression$1", "__", "IS_NULL$subexpression$2", "__"], "postprocess": () => ['IS_NULL']},
    {"name": "NOT$subexpression$1", "symbols": [/[nN]/, /[oO]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "NOT", "symbols": ["__", "NOT$subexpression$1", "__"], "postprocess": () => ['NOT']},
    {"name": "OR$subexpression$1", "symbols": [/[oO]/, /[rR]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "OR", "symbols": ["__", "OR$subexpression$1", "__"], "postprocess": () => ['OR']},
    {"name": "STARTS_WITH$subexpression$1", "symbols": [/[sS]/, /[tT]/, /[aA]/, /[rR]/, /[tT]/, /[sS]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "STARTS_WITH$subexpression$2", "symbols": [/[wW]/, /[iI]/, /[tT]/, /[hH]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "STARTS_WITH", "symbols": ["__", "STARTS_WITH$subexpression$1", "__", "STARTS_WITH$subexpression$2", "__"], "postprocess": () => ['STARTS_WITH']},
    {"name": "XOR$subexpression$1", "symbols": [/[xX]/, /[oO]/, /[rR]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "XOR", "symbols": ["__", "XOR$subexpression$1", "__"], "postprocess": () => ['XOR']},
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
    {"name": "string", "symbols": ["_", "dqstring"], "postprocess": ([, value]) => ({type: 'string', value})},
    {"name": "number", "symbols": ["_", "decimal"], "postprocess": ([, value]) => ({type: 'number', value})},
    {"name": "token", "symbols": ["_", "chars"], "postprocess": ([, value]) => ({type: 'token', value})},
    {"name": "chars$ebnf$1", "symbols": []},
    {"name": "chars$ebnf$1", "symbols": ["chars$ebnf$1", /[a-zA-Z0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "chars", "symbols": [/[a-zA-Z]/, "chars$ebnf$1"], "postprocess": ([value, rest]) => `${value}${rest.join('')}`},
    {"name": "multiLine", "symbols": ["newLine", "singleLine", "multiLine"], "postprocess": ([, hit, rest], _ , reject) => rest ? [hit, rest].join('\n').trim() : reject},
    {"name": "multiLine", "symbols": ["newLine", "multiLine"], "postprocess": ([hit, rest]) => [hit, rest].join('\n').trim()},
    {"name": "multiLine", "symbols": ["newLine"], "postprocess": id},
    {"name": "singleLine$ebnf$1", "symbols": [/[^\n]/]},
    {"name": "singleLine$ebnf$1", "symbols": ["singleLine$ebnf$1", /[^\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "singleLine", "symbols": ["singleLine$ebnf$1"], "postprocess": ([hit], _, reject) => hit.join('').trim()},
    {"name": "newLine", "symbols": [/[\n]/], "postprocess": () => []},
    {"name": "operator", "symbols": ["PLUS"], "postprocess": (from) => ({type: 'operator', value: '+', from})},
    {"name": "operator", "symbols": ["MINUS"], "postprocess": (from) => ({type: 'operator', value: '-', from})},
    {"name": "operator", "symbols": ["TIMES"], "postprocess": (from) => ({type: 'operator', value: '*', from})},
    {"name": "operator", "symbols": ["DIVISION"], "postprocess": (from) => ({type: 'operator', value: '/', from})},
    {"name": "operator", "symbols": ["MODULO"], "postprocess": (from) => ({type: 'operator', value: '%', from})},
    {"name": "operator", "symbols": ["POW"], "postprocess": (from) => ({type: 'operator', value: '^', from})},
    {"name": "operator", "symbols": ["EQUALITY"], "postprocess": (from) => ({type: 'operator', value: '=', from})},
    {"name": "operator", "symbols": ["PLUS_EQUALITY"], "postprocess": (from) => ({type: 'operator', value: '+=', from})},
    {"name": "operator", "symbols": ["LESS_THAN"], "postprocess": (from) => ({type: 'operator', value: '<', from})},
    {"name": "operator", "symbols": ["LESS_THAN_OR_EQUALITY"], "postprocess": (from) => ({type: 'operator', value: '<=', from})},
    {"name": "operator", "symbols": ["GREATER_THAN"], "postprocess": (from) => ({type: 'operator', value: '>', from})},
    {"name": "operator", "symbols": ["GREATER_THAN_OR_EQUALITY"], "postprocess": (from) => ({type: 'operator', value: '>=', from})},
    {"name": "operator", "symbols": ["INEQUALITY"], "postprocess": (from) => ({type: 'operator', value: '<>', from})},
    {"name": "operator", "symbols": ["REGEX_MATCH"], "postprocess": (from) => ({type: 'operator', value: '=~', from})},
    {"name": "operator", "symbols": ["AND"], "postprocess": (from) => ({type: 'operator', value: 'AND', from})},
    {"name": "operator", "symbols": ["CONTAINS"], "postprocess": (from) => ({type: 'operator', value: 'CONTAINS', from})},
    {"name": "operator", "symbols": ["DISTINCT"], "postprocess": (from) => ({type: 'operator', value: 'DISTINCT', from})},
    {"name": "operator", "symbols": ["ENDS_WITH"], "postprocess": (from) => ({type: 'operator', value: 'ENDS WITH', from})},
    {"name": "operator", "symbols": ["IN"], "postprocess": (from) => ({type: 'operator', value: 'IN', from})},
    {"name": "operator", "symbols": ["IS_NOT_NULL"], "postprocess": (from) => ({type: 'operator', value: 'IS NOT NULL', from})},
    {"name": "operator", "symbols": ["IS_NULL"], "postprocess": (from) => ({type: 'operator', value: 'IS NULL', from})},
    {"name": "operator", "symbols": ["NOT"], "postprocess": (from) => ({type: 'operator', value: 'NOT', from})},
    {"name": "operator", "symbols": ["OR"], "postprocess": (from) => ({type: 'operator', value: 'OR', from})},
    {"name": "operator", "symbols": ["STARTS_WITH"], "postprocess": (from) => ({type: 'operator', value: 'STARTS WITH', from})},
    {"name": "operator", "symbols": ["XOR"], "postprocess": (from) => ({type: 'operator', value: 'XOR', from})},
    {"name": "equation", "symbols": ["addsub"], "postprocess": id},
    {"name": "parens", "symbols": ["L_PAREN", "addsub", "R_PAREN"], "postprocess": ([, eq]) => ({...eq, value: `(${eq.value})`, hasParenthesis: true})},
    {"name": "parens", "symbols": ["number"], "postprocess": id},
    {"name": "muldiv", "symbols": ["muldiv", "TIMES", "parens"], "postprocess": ([left,op,right]) => ({type: 'equation', variant: 'TIMES', value: getCalcValue(left, op, right), result: getCalcResult(left, op, right), from: [left, right]})},
    {"name": "muldiv", "symbols": ["muldiv", "DIVISION", "parens"], "postprocess": ([left,op,right]) => ({type: 'equation', variant: 'DIVISION', value: getCalcValue(left, op, right), result: getCalcResult(left, op, right), from: [left, right]})},
    {"name": "muldiv", "symbols": ["muldiv", "MODULO", "parens"], "postprocess": ([left,op,right]) => ({type: 'equation', variant: 'MODULO', value: getCalcValue(left, op, right), result: getCalcResult(left, op, right), from: [left, right]})},
    {"name": "muldiv", "symbols": ["muldiv", "POW", "parens"], "postprocess": ([left,op,right]) => ({type: 'equation', variant: 'POW', value: getCalcValue(left, op, right), result: getCalcResult(left, op, right), from: [left, right]})},
    {"name": "muldiv", "symbols": ["parens"], "postprocess": id},
    {"name": "addsub", "symbols": ["addsub", "PLUS", "muldiv"], "postprocess": ([left,op,right]) => ({type: 'equation', variant: 'PLUS', value: getCalcValue(left, op, right), result: getCalcResult(left, op, right), from: [left, right]})},
    {"name": "addsub", "symbols": ["addsub", "MINUS", "muldiv"], "postprocess": ([left,op,right]) => ({type: 'equation', variant: 'MINUS', value: getCalcValue(left, op, right), result: getCalcResult(left, op, right), from: [left, right]})},
    {"name": "addsub", "symbols": ["muldiv"], "postprocess": id},
    {"name": "lambda", "symbols": ["explicitParameters", "FAT_ARROW", "explicitReturn"], "postprocess": ([parameters,,body]) => ({type: 'lambda', variant: 'explicit', parameters, body})},
    {"name": "lambda", "symbols": ["implicitParameters", "FAT_ARROW", "implicitReturn"], "postprocess": ([parameters,,body]) => ({type: 'lambda', variant: 'implicit', parameters, body})},
    {"name": "explicitReturn", "symbols": ["L_CURLY", "singleLine", "multiLine", "__", "RETURN", "returnValues", "R_CURLY"], "postprocess": ([,statement1, statement2,,, returnValues]) => ({statement: [statement1, statement2].join('\n').trim(), returnValues})},
    {"name": "explicitReturn", "symbols": ["L_CURLY", "multiLine", "__", "RETURN", "returnValues", "R_CURLY"], "postprocess": ([,statement,,, returnValues]) => ({statement, returnValues})},
    {"name": "explicitReturn", "symbols": ["L_CURLY", "singleLine", "__", "RETURN", "returnValues", "R_CURLY"], "postprocess": ([,statement,,, returnValues]) => ({statement, returnValues})},
    {"name": "explicitReturn", "symbols": ["L_CURLY", "_", "RETURN", "returnValues", "R_CURLY"], "postprocess": ([,,, returnValues]) => ({statement: '', returnValues})},
    {"name": "implicitReturn", "symbols": ["returnValue"], "postprocess": ([returnValue]) => ({returnValues: [returnValue]})},
    {"name": "returnValues", "symbols": ["returnValue", "COMMA", "returnValues"], "postprocess": ([hit,, rest]) => [hit, ...rest]},
    {"name": "returnValues", "symbols": ["returnValue"]},
    {"name": "returnValue", "symbols": ["complexValue", "AS", "token"], "postprocess": ([original,, name]) => ({...original, alias: name.value})},
    {"name": "returnValue", "symbols": ["complexValue"], "postprocess": id},
    {"name": "complexValue", "symbols": ["value", "operator", "complexValueNoEq"], "postprocess":  ([value, op, ...rest]) => ({
            value: `${getDisplayValue(value)} ${op.value} ${rest.map(({value}) => value).join('')}`,
            type: 'complex',
            from: [value, op, ...rest]
        }) },
    {"name": "complexValue", "symbols": ["value", "nestedObjectPath", "operator", "complexValue"], "postprocess":  ([value, path, op, ...rest]) => ({ 
            value: `${getDisplayValue(value)}${path.map(({value}) => value).join('')} ${op.value} ${rest.map(({value}) => value).join('')}`,
            type: 'complex',
            from: [value, op, ...path, ...rest]
        }) },
    {"name": "complexValue", "symbols": ["value", "nestedObjectPath"], "postprocess": ([value, path]) => ({ value: `${getDisplayValue(value)}${path.map(({value}) => value).join('')}`, type: 'path', from: [value, ...path]})},
    {"name": "complexValue", "symbols": ["value"], "postprocess": ([value]) => ({value: getDisplayValue(value), type: value.type, from: [value]})},
    {"name": "complexValueNoEq", "symbols": ["valueNoEq", "operator", "complexValue"], "postprocess":  ([value, op, ...rest]) => ({
            value: `${getDisplayValue(value)} ${op.value} ${rest.map(({value}) => value).join('')}`,
            type: 'complex',
            from: [value, op, ...rest]
        }) },
    {"name": "complexValueNoEq", "symbols": ["valueNoEq", "nestedObjectPath", "operator", "complexValue"], "postprocess":  ([value, path, op, ...rest]) => ({ 
            value: `${getDisplayValue(value)}${path.map(({value}) => value).join('')} ${op.value} ${rest.map(({value}) => value).join('')}`,
            type: 'complex',
            from: [value, op, ...path, ...rest]
        }) },
    {"name": "complexValueNoEq", "symbols": ["valueNoEq", "nestedObjectPath"], "postprocess": ([value, path]) => ({ value: `${getDisplayValue(value)}${path.map(({value}) => value).join('')}`, type: 'path', from: [value, ...path]})},
    {"name": "complexValueNoEq", "symbols": ["valueNoEq"], "postprocess": ([value]) => ({value: getDisplayValue(value), type: value.type, from: [value]})},
    {"name": "valueNoEq", "symbols": ["token"], "postprocess": id},
    {"name": "valueNoEq", "symbols": ["string"], "postprocess": id},
    {"name": "valueNoEq", "symbols": ["functionCall"], "postprocess": id},
    {"name": "value", "symbols": ["token"], "postprocess": id},
    {"name": "value", "symbols": ["equation"], "postprocess": id},
    {"name": "value", "symbols": ["string"], "postprocess": id},
    {"name": "value", "symbols": ["functionCall"], "postprocess": id},
    {"name": "explicitParameters", "symbols": ["array"], "postprocess": id},
    {"name": "explicitParameters", "symbols": ["token"], "postprocess": id},
    {"name": "implicitParameters", "symbols": ["token"], "postprocess": id},
    {"name": "array", "symbols": ["L_SQUARE", "items", "R_SQUARE"], "postprocess": ([, items]) => ({type: 'array', items})},
    {"name": "items", "symbols": ["item", "COMMA", "items"], "postprocess": ([hit,, rest]) => [hit, ...rest]},
    {"name": "items", "symbols": ["item"], "postprocess": ([hit]) => [hit]},
    {"name": "item", "symbols": ["object"], "postprocess": id},
    {"name": "item", "symbols": ["token"], "postprocess": id},
    {"name": "nestedObjectPath", "symbols": ["objectPath", "nestedObjectPath"], "postprocess": ([path, rest]) => [path, ...rest]},
    {"name": "nestedObjectPath", "symbols": ["objectPath"]},
    {"name": "objectPath", "symbols": ["L_SQUARE", "number", "R_SQUARE"], "postprocess": ([, index]) => ({type: 'path', variant: index.type, value: `[${index.value}]`})},
    {"name": "objectPath", "symbols": ["L_SQUARE", "string", "R_SQUARE"], "postprocess": ([, key]) => ({type: 'path', variant: key.type, value: `["${key.value}"]`})},
    {"name": "objectPath", "symbols": ["DOT", "token"], "postprocess": ([, key]) => ({type: 'path', variant: key.type, value: `.${key.value}`})},
    {"name": "object", "symbols": ["L_CURLY", "objectKeys", "R_CURLY"], "postprocess": ([, keys]) => ({type: 'object', keys})},
    {"name": "objectKeys", "symbols": ["objectKey", "COMMA", "objectKeys"], "postprocess": ([objectKey,, rest]) => [objectKey, ...rest]},
    {"name": "objectKeys", "symbols": ["objectKey"], "postprocess": ([key]) => [key]},
    {"name": "objectKey", "symbols": ["functionCall", "COLON", "token"], "postprocess": ([func,, alias]) => ({...func, alias: alias.value})},
    {"name": "objectKey", "symbols": ["token", "COLON", "token"], "postprocess": ([token,, alias]) => ({...token, alias: alias.value})},
    {"name": "objectKey", "symbols": ["functionCall"], "postprocess": id},
    {"name": "objectKey", "symbols": ["token"], "postprocess": id},
    {"name": "functionCall", "symbols": ["token", "L_PAREN", "functionArgs", "R_PAREN"], "postprocess": ([name,, args]) => ({type: 'functionCall', name: name.value, value: `${name.value}(${args.map(({value}) => value).join()})`, args})},
    {"name": "functionCall", "symbols": ["token", "L_PAREN", "R_PAREN"], "postprocess": ([name]) => ({type: 'functionCall', name: name.value, value: `${name.value}()`, args: []})},
    {"name": "functionArgs", "symbols": ["complexValue", "COMMA", "functionArgs"], "postprocess": ([value,, rest]) => [value, ...rest]},
    {"name": "functionArgs", "symbols": ["complexValue"], "postprocess": ([value]) => [value]}
];
let ParserStart = "lambda";
export default { Lexer, ParserRules, ParserStart };
