@include "./constants.ne"
@include "./primitives.ne"
@include "./operators.ne"

# math equations, credit https://medium.com/@gajus/parsing-absolutely-anything-in-javascript-using-earley-algorithm-886edcc31e5e
equation -> addsub {% id %}

# Parentheses
parens -> L_PAREN addsub R_PAREN {% ([, eq]) => ({...eq, value: `(${eq.value})`, hasParenthesis: true}) %}
    | number {% id %}
	
# Multiplication and division
muldiv -> muldiv TIMES parens {% ([left,op,right]) => ({type: 'equation', variant: 'TIMES', value: getCalcValue(left, op, right), result: getCalcResult(left, op, right), from: [left, right]}) %}
    | muldiv DIVISION parens {% ([left,op,right]) => ({type: 'equation', variant: 'DIVISION', value: getCalcValue(left, op, right), result: getCalcResult(left, op, right), from: [left, right]}) %}
    | muldiv MODULO parens {% ([left,op,right]) => ({type: 'equation', variant: 'MODULO', value: getCalcValue(left, op, right), result: getCalcResult(left, op, right), from: [left, right]}) %}
    | muldiv POW parens {% ([left,op,right]) => ({type: 'equation', variant: 'POW', value: getCalcValue(left, op, right), result: getCalcResult(left, op, right), from: [left, right]}) %}
    | parens {% id %}
	
# Addition and subtraction
addsub -> addsub PLUS muldiv {% ([left,op,right]) => ({type: 'equation', variant: 'PLUS', value: getCalcValue(left, op, right), result: getCalcResult(left, op, right), from: [left, right]}) %}
  | addsub MINUS muldiv {% ([left,op,right]) => ({type: 'equation', variant: 'MINUS', value: getCalcValue(left, op, right), result: getCalcResult(left, op, right), from: [left, right]}) %}
  | muldiv {% id %}

@{%
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
%}

@{%
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
%}