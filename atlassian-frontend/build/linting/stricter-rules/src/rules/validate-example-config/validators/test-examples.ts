/**
 * In order to optimise test caching, we want to exclude dependencies that don't affect tests from the hash calculation.
 * To do this, we require that all packages have a defined list of what examples are used by tests.
 * This stricter rule enforces the accuracy of that list by determining what examples are depended on by tests,
 * and checking that each example exists in the `examples/config.jsonc` file.
 *
 * 2 things are checked:
 *  1. The imports of all test files are checked for example files
 *  2. The AST of VR and integration tests are parsed to find usage of examples
 *
 * It also allows that list to be automatically updating by running `yarn lint:stricter --fix`
 */
import path from 'path';
import { default as j, ASTNode } from 'jscodeshift';

import { EXAMPLE_CONFIG_PATH } from '../../../common/files';
import { EnrichedPackage } from '../../../types';

import { ExampleConfigValidator } from '../types';
import { updateExampleConfig, createExampleFileRegex } from '../common';

type Error = {
  pkg: EnrichedPackage;
  shouldBeDefined: string[];
  toAdd: string[];
  toRemove: string[];
};

const defaultErrorTransformer = (errors: Error[]) =>
  errors.map(({ pkg, shouldBeDefined, toAdd, toRemove }) => ({
    message:
      `${pkg.name}: Examples loaded by tests need to be defined in ${EXAMPLE_CONFIG_PATH} testExamples: ` +
      '(' +
      toRemove
        .map(fileName => `- ${fileName}`)
        .concat(toAdd.map(fileName => `+ ${fileName}`))
        .join(', ') +
      ')',
    fix: () => updateExampleConfig(pkg, 'testExamples', shouldBeDefined),
  }));

/**
 * Traverses a file to find all strings that are the names of examples
 * @param ast The abstract syntax tree that is traversed
 * @param normalizedExamplesMap Map from normalized example name to example file name. (e.g. `with-theme` -> `4-with-theme.tsx`)
 * @param examplesLoadedByTests Adds each example to this set
 */
const extractExamplesUsedByFile = (
  ast: ASTNode,
  normalizedExamplesMap: Map<string, string>,
  examplesLoadedByTests: Set<string>,
) => {
  j(ast)
    .find(j.StringLiteral)
    .forEach(({ node }) => {
      const example = normalizedExamplesMap.get(node.value);
      if (example) {
        examplesLoadedByTests.add(example);
      }
    });
};

/**
 * Map normalized example name to file name.
 * e.g. `with-theme` -> `4-with-theme.tsx`
 */
const createNormalizedExamplesMap = (exampleFiles: string[]) =>
  new Map<string, string>(
    exampleFiles.map(exampleFile => [
      path
        .basename(exampleFile, path.extname(exampleFile))
        .replace(/^[\d]+-/, ''),
      path.basename(exampleFile),
    ]),
  );

const nonUnitTestFileRegex = /\/__tests__\/(integration|visual-regression|_|[^/]+\/_)/;

export const validateTestExamples: ExampleConfigValidator = ({
  pkg,
  files,
  errorTransformer = defaultErrorTransformer,
}) => {
  const errors: Error[] = [];

  const normalizedExamplesMap = createNormalizedExamplesMap(pkg.exampleFiles);

  const exampleFileRegex = createExampleFileRegex(pkg.packagePath);

  const examplesUsedByTests = new Set<string>();
  pkg.testFiles.forEach(testFile => {
    const file = files[testFile];

    // Check every test file for imported examples
    if (file.dependencies) {
      file.dependencies.forEach(dep => {
        if (exampleFileRegex.test(dep)) {
          examplesUsedByTests.add(path.basename(dep));
        }
      });
    }

    // Traverse any non-unit test file inside __tests__ for loaded eaxmples
    if (!nonUnitTestFileRegex.test(testFile) || !file.ast) {
      return;
    }
    extractExamplesUsedByFile(
      file.ast(),
      normalizedExamplesMap,
      examplesUsedByTests,
    );
  });

  const areDefined = (pkg.exampleConfig?.testExamples || []).sort();
  const shouldBeDefined = Array.from(examplesUsedByTests).sort();
  const toAdd = shouldBeDefined.filter(
    example => !areDefined.includes(example),
  );
  const toRemove = areDefined.filter(
    example => !shouldBeDefined.includes(example),
  );

  if (toAdd.length || toRemove.length) {
    errors.push({
      pkg,
      shouldBeDefined,
      toAdd,
      toRemove,
    });
  }

  return errorTransformer(errors);
};
