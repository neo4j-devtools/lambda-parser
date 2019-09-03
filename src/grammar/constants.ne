@builtin "whitespace.ne"

COMMA -> _ "," {% () => ['COMMA'] %}
COLON -> _ ":" {% () => ['COLON'] %}
L_SQUARE -> _ "[" {% () => ['L_SQUARE'] %}
R_SQUARE -> _ "]" {% () => ['R_SQUARE'] %}
L_CURLY -> _ "{" {% () => ['L_CURLY'] %}
R_CURLY -> _ "}" {% () => ['R_CURLY'] %}
L_PAREN -> _ "(" {% () => ['L_PAREN'] %}
R_PAREN -> _ ")" {% () => ['R_PAREN'] %}
FAT_ARROW -> _ "=>" {% () => ['F_ARROW'] %}
RETURN -> "RETURN"i __ {% () => ['RETURN'] %}
AS -> __ "AS"i {% () => ['AS'] %}
TILDE -> __ "~" {% () => ['TILDE'] %}

# Operators
DOT -> _ "." {% () => ['DOT'] %}
PLUS -> _ "+" {% () => ['PLUS'] %}
MINUS -> _ "-" {% () => ['MINUS'] %}
TIMES -> _ "*" {% () => ['TIMES'] %}
DIVISION -> _ "/" {% () => ['DIVISION'] %}
MODULO -> _ "%" {% () => ['MODULO'] %}
POW -> _ "^" {% () => ['POW'] %}
EQUALITY -> _ "=" {% () => ['EQUALITY'] %}
PLUS_EQUALITY -> PLUS EQUALITY {% () => ['PLUS_EQUALITY'] %}
LESS_THAN -> _ "<" {% () => ['LESS_THAN'] %}
LESS_THAN_OR_EQUALITY -> LESS_THAN EQUALITY {% () => ['LESS_THAN_OR_EQUALITY'] %}
GREATER_THAN -> _ ">" {% () => ['GREATER_THAN'] %}
GREATER_THAN_OR_EQUALITY -> GREATER_THAN EQUALITY {% () => ['GREATER_THAN_OR_EQUALITY'] %}
INEQUALITY -> LESS_THAN GREATER_THAN {% () => ['INEQUALITY'] %}
REGEX_MATCH -> EQUALITY TILDE {% () => ['REGEX_MATCH'] %}

# logical operators
AND -> __ "AND"i __ {% () => ['AND'] %}
CONTAINS -> __ "CONTAINS"i __ {% () => ['CONTAINS'] %}
DISTINCT -> __ "DISTINCT"i __ {% () => ['DISTINCT'] %}
ENDS_WITH -> __ "ENDS"i __ "WITH"i __ {% () => ['ENDS_WITH'] %}
IN -> __ "IN"i __ {% () => ['IN'] %}
IS_NOT_NULL -> __ "IS"i __ "NOT"i __ "NULL"i __ {% () => ['IS_NOT_NULL'] %}
IS_NULL -> __ "IS"i __ "NULL"i __ {% () => ['IS_NULL'] %}
NOT -> __ "NOT"i __ {% () => ['NOT'] %}
OR -> __ "OR"i __ {% () => ['OR'] %}
STARTS_WITH -> __ "STARTS"i __ "WITH"i __ {% () => ['STARTS_WITH'] %}
XOR -> __ "XOR"i __ {% () => ['XOR'] %}