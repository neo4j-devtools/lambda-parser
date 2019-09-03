@include "./constants.ne"
@include "./primitives.ne"
@include "./math.ne"

operator -> PLUS {% (from) => ({type: 'operator', value: '+', from}) %}
    | MINUS {% (from) => ({type: 'operator', value: '-', from}) %}
    | TIMES {% (from) => ({type: 'operator', value: '*', from}) %}
    | DIVISION {% (from) => ({type: 'operator', value: '/', from}) %}
    | MODULO {% (from) => ({type: 'operator', value: '%', from}) %}
    | POW {% (from) => ({type: 'operator', value: '^', from}) %}
    | EQUALITY {% (from) => ({type: 'operator', value: '=', from}) %}
    | PLUS_EQUALITY {% (from) => ({type: 'operator', value: '+=', from}) %}
    | LESS_THAN {% (from) => ({type: 'operator', value: '<', from}) %}
    | LESS_THAN_OR_EQUALITY {% (from) => ({type: 'operator', value: '<=', from}) %}
    | GREATER_THAN {% (from) => ({type: 'operator', value: '>', from}) %}
    | GREATER_THAN_OR_EQUALITY {% (from) => ({type: 'operator', value: '>=', from}) %}
    | INEQUALITY {% (from) => ({type: 'operator', value: '<>', from}) %}
    | REGEX_MATCH {% (from) => ({type: 'operator', value: '=~', from}) %}
    | AND {% (from) => ({type: 'operator', value: 'AND', from}) %}
    | CONTAINS {% (from) => ({type: 'operator', value: 'CONTAINS', from}) %}
    | DISTINCT {% (from) => ({type: 'operator', value: 'DISTINCT', from}) %}
    | ENDS_WITH {% (from) => ({type: 'operator', value: 'ENDS WITH', from}) %}
    | IN {% (from) => ({type: 'operator', value: 'IN', from}) %}
    | IS_NOT_NULL {% (from) => ({type: 'operator', value: 'IS NOT NULL', from}) %}
    | IS_NULL {% (from) => ({type: 'operator', value: 'IS NULL', from}) %}
    | NOT {% (from) => ({type: 'operator', value: 'NOT', from}) %}
    | OR {% (from) => ({type: 'operator', value: 'OR', from}) %}
    | STARTS_WITH {% (from) => ({type: 'operator', value: 'STARTS WITH', from}) %}
    | XOR {% (from) => ({type: 'operator', value: 'XOR', from}) %}
