@{%
function getCalcValue (left, op, right) {
	switch(`${op}`) {
		case 'POW':
			return left.value ^ right.value
		case 'PLUS':
			return left.value + right.value
		case 'MINUS':
			return left.value - right.value
		case 'TIMES':
			return left.value * right.value
		case 'DIVISION':
			return left.value / right.value
		case 'MODULO':
			return left.value % right.value
		default:
			throw new Error(`${op} not yet supported`)
	}
}
%}