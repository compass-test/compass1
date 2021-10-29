import path from 'path';

import type { Rule } from 'eslint';

interface Options {
  test: RegExp;
  shouldMatch: RegExp;
  message: string;
}

/**
 * @file Forces file names to match pattern passed into options
 */
const rule: Rule.RuleModule = {
  meta: {
    schema: [
      {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          required: ['test', 'shouldMatch', 'message'],
          properties: {
            test: {
              title:
                'This config only processes filenames that matches this test',
              type: 'string',
              format: 'regex',
            },
            shouldMatch: {
              title: 'Files that passes the `test` should match this regex',
              type: 'string',
              format: 'regex',
            },
            message: {
              title:
                'Message to display to developers when filename does not match `shouldMatch` config',
              type: 'string',
            },
          },
          additionalProperties: false,
        },
      },
    ],
  },
  create(context) {
    const options: Options[] = context.options[0].map(
      ({ test, shouldMatch, message }: Options) => ({
        test: new RegExp(test),
        shouldMatch: new RegExp(shouldMatch),
        message,
      }),
    );

    return {
      'Program:exit': (node: Rule.Node) => {
        const fileName = path.basename(context.getFilename());

        options.forEach(({ test, shouldMatch, message }) => {
          if (test.test(fileName) && !shouldMatch.test(fileName)) {
            context.report({ node, message });
          }
        });
      },
    };
  },
};

export default rule;
