@include "./constants.ne"
@include "./primitives.ne"
@include "./functions.ne"

# math equations, credit https://medium.com/@gajus/parsing-absolutely-anything-in-javascript-using-earley-algorithm-886edcc31e5e
equation -> addsub {% id %}

# Parentheses
parens -> L_PAREN addsub R_PAREN {% ([, eq]) => ({...eq, variant: 'parenthesis'}) %}
    | number {% id %}
	
# Multiplication and division
muldiv -> muldiv TIMES parens {% ([left,op,right]) => ({type: 'equation', variant: 'TIMES', value: getCalcValue(left, op, right), from: [left, right]}) %}
    | muldiv DIVISION parens {% ([left,op,right]) => ({type: 'equation', variant: 'DIVISION', value: getCalcValue(left, op, right), from: [left, right]}) %}
    | muldiv MODULO parens {% ([left,op,right]) => ({type: 'equation', variant: 'MODULO', value: getCalcValue(left, op, right), from: [left, right]}) %}
    | muldiv POW parens {% ([left,op,right]) => ({type: 'equation', variant: 'POW', value: getCalcValue(left, op, right), from: [left, right]}) %}
    | parens {% id %}
	
# Addition and subtraction
addsub -> addsub PLUS muldiv {% ([left,op,right]) => ({type: 'equation', variant: 'PLUS', value: getCalcValue(left, op, right), from: [left, right]}) %}
  | addsub MINUS muldiv {% ([left,op,right]) => ({type: 'equation', variant: 'MINUS', value: getCalcValue(left, op, right), from: [left, right]}) %}
  | muldiv {% id %}
