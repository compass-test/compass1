import { API, FileInfo, Options } from 'jscodeshift';

import {
  callExpressionArgMatchesString,
  testMethodVariantEach,
} from '@atlaskit/codemod-utils';

import addCommentBefore from './support';

/**
 * Coemod transform utility which changes `.it`, `.test` and `.describe`
 * (spec-style) test methods in source code to `it.skip`, `test.skip` and
 * `describe.skip`, effectively skipping the targeted test.
 */

const helper = (paths: any, pattern: string[], index: number): any => {
  if (index >= pattern.length) {
    return [];
  }
  const node = paths.filter((path: any) => {
    return (
      path.type === 'ExpressionStatement' &&
      callExpressionArgMatchesString(
        path.expression.arguments[0],
        pattern[index].trim(),
      )
    );
  });
  if (node.length) {
    if (index + 1 === pattern.length) {
      return node;
    }
    let children = node[0].expression.arguments[1].body.body;
    return helper(children, pattern, index + 1);
  }
  return [];
};

const skipTestMethods = (callee: any, testMethods: Set<string>) => {
  if (callee.object) {
    const name = callee.object.name;
    if (testMethods.has(name)) {
      callee.object.name = name + '.skip';
    }
  } else {
    const name = callee.name;
    if (testMethods.has(name)) {
      callee.name = name + '.skip';
    }
  }
};

/**
 * Note:
 * Output from `console.log` and `console.info` go via `stdout`,
 * where as `console.warn` and `console.error` go via `stderr`.
 */
const skipSpecStyleTestTransformer = (
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) => {
  const source = j(fileInfo.source);
  const testMethods = new Set(['it', 'test', 'describe']);
  const { testName, comment, ancestorLabels } = options;
  if (ancestorLabels) {
    let patterns = ancestorLabels.split(' › ');
    const initial = patterns[0];
    patterns.push(testName);
    patterns = patterns.slice(1);
    source
      .find(j.ExpressionStatement, {
        expression: {
          callee: {
            type: 'Identifier',
            name: 'describe',
          },
        },
      })
      .filter(path => {
        const args = j(path.value.expression).get('arguments').value;
        return (
          args[0].type.indexOf('Literal') !== -1 &&
          callExpressionArgMatchesString(args[0], initial.trim())
        );
      })
      .forEach(path => {
        const body = j(path.value.expression).get('arguments').value[1].body
          .body;

        let result = helper(body, patterns, 0);
        if (result.length) {
          skipTestMethods(result[0].expression.callee, testMethods);
          addCommentBefore(j, result[0].expression, comment, 'line');
        }
      });
  } else {
    source
      .find(j.CallExpression)
      .filter(path => {
        const {
          // @ts-ignore
          callee: { name, type, property },
          arguments: args,
        } = path.value;

        const matchesTestName = !!(
          args.length && callExpressionArgMatchesString(args[0], testName)
        );
        return (
          type !== 'MemberExpression' &&
          (testMethods.has(name) || testMethodVariantEach(path, testMethods)) &&
          matchesTestName
        );
      })
      .forEach(path => {
        const { callee }: any = path.value.callee;
        if (callee) {
          skipTestMethods(callee, testMethods);
        } else {
          skipTestMethods(path.value.callee, testMethods);
        }
        addCommentBefore(j, path, comment, 'line');
      });
  }

  // Retain single quotes to match our Prettier config
  return source.toSource({ quote: 'single' });
};

/**
 * Transformer to skip a specific test case.
 *
 * Useful if you've made an API breaking change that's gauranteed to
 * fail in-product tests, and you wish to temporarily skip them during
 * the development phase to keep your branch green.
 *
 * For example, you're workin within `develop` on the scheduled release
 * cycle where it's imperative to keep the product branch deploy green
 * to avoid impacting others, ahead of fixing the product tests later
 * in the release workflow.
 *
 * You can test your transformer locally via:
 *
 * ```
 * bolt build @atlaskit/codemod-utils
 * npx @atlaskit/codemod-cli -t abs/path/to/packages/foo/codemods/skip-product-test.ts --ignore-pattern=node_modules --parser=ts --extensions=ts abs/path/to/product/tests/
 * ```
 *
 * @param testName Label for an `test`, `it`, or `describe` block that you wish to skip.
 * @param comment Message to be inserted above a skipped test case/block.
 * @param ancestorLabel Optional ancestor labels to specify an exact label match relative to ancestors.
 */
export const createSkippedSpecStyleTestTransformer = (
  testName: string,
  comment: string,
  ancestorLabel: string,
) => {
  return (fileInfo: FileInfo, api: API, options: Options) =>
    skipSpecStyleTestTransformer(
      fileInfo,
      api,
      Object.assign(options, { testName, comment, ancestorLabel }),
    );
};

export default skipSpecStyleTestTransformer;
