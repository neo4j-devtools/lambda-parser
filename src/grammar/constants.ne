@builtin "whitespace.ne"

DOT -> _ "." {% () => ['DOT'] %}
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
PLUS -> _ "+" {% () => ['PLUS'] %}
MINUS -> _ "-" {% () => ['MINUS'] %}
TIMES -> _ "*" {% () => ['TIMES'] %}
DIVISION -> _ "/" {% () => ['DIVISION'] %}
MODULO -> _ "%" {% () => ['MODULO'] %}
POW -> _ "^" {% () => ['POW'] %}
