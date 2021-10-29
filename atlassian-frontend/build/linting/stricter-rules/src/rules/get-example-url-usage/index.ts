/**
 * Throws error for each file that imports from an VR or integration test util package
 * that doesn't live inside __tests__.
 * This is to prevent example usage from escaping the validate-test-examples rule.
 */
import path from 'path';

import { getExampleUrlExclusions } from '../../common/exclusion-lists';
import { RuleDefinition } from '../../types';

type Error = {
  fileName: string;
};

const defaultErrorTransformer = (errors: Error[]) =>
  errors.map(
    ({ fileName }) =>
      `${fileName} depends on VR or integration test utils so should live inside a __tests__ directory`,
  );

const ruleDefinition: RuleDefinition = {
  onProject: ({
    files,
    rootPath,
    config,
    errorTransformer = defaultErrorTransformer,
  }) => {
    const { workspaces } = config;

    const errors: Error[] = [];

    const allFiles = Object.entries(files);

    const fileNameToPackage = (fileName: string) =>
      workspaces.find(pkg => fileName.startsWith(pkg.dir + path.sep));

    allFiles.forEach(([fileName, file]) => {
      if (!file.dependencies) {
        return;
      }

      const pkg = fileNameToPackage(fileName);
      if (!pkg || getExampleUrlExclusions.has(pkg.name)) {
        return;
      }

      if (
        file.dependencies.some(
          dep =>
            dep.includes('/build/test-utils/visual-regression/helper') ||
            dep.includes('/build/test-utils/webdriver-runner/utils/example'),
        )
      ) {
        errors.push({
          fileName: path.relative(rootPath, fileName),
        });
      }
    });

    return errorTransformer(errors);
  },
};

export default ruleDefinition;
