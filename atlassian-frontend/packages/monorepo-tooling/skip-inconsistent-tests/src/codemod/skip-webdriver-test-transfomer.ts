import { API, FileInfo, Options } from 'jscodeshift';

import { callExpressionArgMatchesString } from '@atlaskit/codemod-utils';

/**
 * Codemod transform utility to skip a `BrowserTestCase`
 * (Webdriver Integration Test).
 *
 * Searches for a matching test case label within a test file
 * and skips it by manipulating the `skip` browsers array.
 * The skipped test can have an optional comment added above it.
 *
 * ```
 * /\* This test was skipped by a codemod *\/
 * BrowserTestCase('label', { skip: ['*']}, () => {})
 * ```
 *
 * Note:
 * Output from `console.log` and `console.info` go via `stdout`,
 * where as `console.warn` and `console.error` go via `stderr`.
 */
const skipWebdriverTestTransformer = (
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) => {
  const source = j(fileInfo.source);
  const { testName, comment } = options;
  source
    .find(j.ExpressionStatement, {
      expression: {
        callee: {
          type: 'Identifier',
          name: 'BrowserTestCase',
        },
      },
    })
    .filter(path => {
      const args = j(path.value.expression).get('arguments').value;
      return args.length && callExpressionArgMatchesString(args[0], testName);
    })
    .forEach((path: any) => {
      const {
        properties: testCaseOptions,
      } = path.value.expression.arguments[1];
      if (!testCaseOptions) {
        console.info(
          `BrowserTestCase has an external options array. Aborting due to complexity`,
        );
        return;
      }

      const skipPropertyIndex = testCaseOptions.findIndex(
        (opt: any) => opt.key.name === 'skip',
      );
      const { key, value: skipArray } = testCaseOptions[skipPropertyIndex] || {
        key: { name: '' },
        value: { elements: [] },
      };

      const hasSkipArray = key.name === 'skip';
      const hasInlineSkippedBrowsersArray = !!skipArray.elements;

      // Check for pre-existing browser values
      const browsersList: string[] = (skipArray.elements || []).map(
        (browser: { value: string }) => `'${browser.value}'`,
      );

      if (browsersList.includes(`'*'`)) {
        // The test is already skipped. Gracefully ignore the file.
        return;
      }

      const linesToAdd = [];

      if (hasSkipArray) {
        if (!!browsersList.length) {
          linesToAdd.push(
            // Duplicate pre-existing skip array into a new comment above the line
            j.commentLine(` ${key.name}: [${browsersList.join(', ')}]`),
          );
        } else if (!hasInlineSkippedBrowsersArray) {
          linesToAdd.push(
            // Duplicate pre-existing externally references skip array into a new comment above the line
            j.commentLine(` ${key.name}: ${skipArray.name}`),
          );
        }
      }

      // Insert skip array containing only the wildcard browser value
      linesToAdd.push(
        j.property(
          'init',
          j.identifier('skip'),
          j.arrayExpression([j.literal('*')]),
        ),
      );

      if (skipPropertyIndex === -1) {
        // Insert new skip array
        linesToAdd.forEach(line => testCaseOptions.push(line));
      } else {
        // Replace original skip property with our adjustments
        testCaseOptions.splice(skipPropertyIndex, 1, ...linesToAdd);
      }

      if (comment) {
        // Insert comment above the BrowserTestCase if one is provided
        path.value.comments = [
          ...(path.value.comments || []),
          j.commentLine(` ${comment}`),
        ];
      }
    });

  // Retain single quotes and trailing commas to match our Prettier config
  return source.toSource({ quote: 'single', trailingComma: true });
};

export default skipWebdriverTestTransformer;
