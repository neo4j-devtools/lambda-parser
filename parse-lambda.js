import nearley from 'nearley';

import grammar from './grammar';

export default function parseLambda(string) {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    parser.feed(string);

    return parser.results
};
